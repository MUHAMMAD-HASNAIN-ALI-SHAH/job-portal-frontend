import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import type { ApplicantForm, RecruiterForm, User } from "../interfaces";
import useApplicantStore from "./useApplicantStore";
import useRecruiterStore from "./useRecruiterScore";

interface AuthState {
  user: User | null; // to store user email, _id and role
  applicantForm: ApplicantForm; // to store applicant registration form data
  recruiterForm: RecruiterForm; // to store recruiter registration form data
  code: string; // to store verification code
  isAuthenticated: boolean; // to track authentication status
  isAuthenticatedLoading: boolean; // to track loading state during authentication
  registerStage: string; // to track the current stage of registration

  // Methods
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // to handle code input change
  handleChangeApplicantForm: (e: React.ChangeEvent<HTMLInputElement>) => void; // to handle applicant form input change
  handleChangeRecruiterForm: (e: React.ChangeEvent<HTMLInputElement>) => void; // to handle recruiter form input change
  applicantRegistration: (applicant: ApplicantForm) => Promise<number>; // to handle applicant registration
  recruiterRegistration: (recruiter: RecruiterForm) => Promise<number>; // to handle recruiter registration
  codeVerification: (code: string, email: string) => Promise<number>; // to handle code verification
  login: (email: string, password: string) => Promise<number>; // to handle user login
  setRegisterStage: (stage: string) => void; // to set the current registration stage
  onLogout: () => Promise<void>; // to handle user logout
  verify: () => Promise<void>; // to verify user authentication status
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  applicant: null,
  applicantForm: {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  },
  code: "",
  isAuthenticated: false,
  isAuthenticatedLoading: true,
  registerStage: "selection",
  recruiterForm: {
    fullName: "",
    email: "",
    password: "",
    companyName: "",
  },

  // Methods
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    set({ code: e.target.value });
  },
  handleChangeApplicantForm: (e: React.ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      applicantForm: {
        ...state.applicantForm,
        [e.target.name]: e.target.value,
      },
    }));
  },
  handleChangeRecruiterForm: (e: React.ChangeEvent<HTMLInputElement>) => {
    set((state) => ({
      recruiterForm: {
        ...state.recruiterForm,
        [e.target.name]: e.target.value,
      },
    }));
  },
  applicantRegistration: async (applicant: ApplicantForm) => {
    try {
      await axiosInstance.post(
        "/api/v1/auth/applicant-registration",
        applicant
      );
      set({ registerStage: "code-verification" });
      return 200;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Registration failed.");
      console.error("Applicant registration error:", error);
      return 500;
    }
  },
  recruiterRegistration: async (recruiter: RecruiterForm) => {
    try {
      await axiosInstance.post(
        "/api/v1/auth/recruiter-registration",
        recruiter
      );
      set({ registerStage: "code-verification" });
      return 200;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Registration failed.");
      console.error("Recruiter registration error:", error);
      return 500;
    }
  },
  codeVerification: async (code, email) => {
    try {
      await axiosInstance.post("/api/v1/auth/verify-email", { code, email });
      toast.success("Email verified successfully!");
      return 200;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Code verification failed.");
      console.error("Code verification error:", error);
      return 500;
    }
  },
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });
      set({ user: response.data.user, isAuthenticated: true });
      if (response.data.user.role === "applicant") {
        useApplicantStore.getState().getApplicantDetails();
      }
      if (response.data.user.role === "recruiter") {
        useRecruiterStore.getState().getRecruiterDetails();
      }
      return 200;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Login failed.");
      console.error("Login error:", error);
      return 500;
    }
  },

  onLogout: async () => {
    try {
      await axiosInstance.get("/api/v1/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  setRegisterStage: (stage: string) => {
    set({ registerStage: stage });
  },

  verify: async () => {
    try {
      const response = await axiosInstance.get("/api/v1/auth/verify");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      if (response.data.user.role === "applicant") {
        useApplicantStore.getState().getApplicantDetails();
      }
      if (response.data.user.role === "recruiter") {
        useRecruiterStore.getState().getRecruiterDetails();
      }
      set({ isAuthenticatedLoading: false });
    } catch (error: any) {
      console.error("Verification error:", error);
      set({ user: null, isAuthenticated: false });
      set({ isAuthenticatedLoading: false });
    }
  },
}));

export default useAuthStore;
