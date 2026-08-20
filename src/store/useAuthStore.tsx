import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import type { User } from "../interfaces";
import useApplicantStore from "./useApplicantStore";
import useCompanyStore from "./useCompanyStore";

interface AuthState {
  user: User | null; // to store user email, _id and role
  isAuthenticated: boolean; // to track authentication status
  isAuthenticatedLoading: boolean; // to track loading state during authentication

  // Methods
  login: (email: string, password: string) => Promise<number>; // to handle user login
  onLogout: () => Promise<void>; // to handle user logout
  verify: () => Promise<void>; // to verify user authentication status
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticatedLoading: true,

  // Methods
  login: async (email: string, password: string) => {
    try {
      set({ isAuthenticatedLoading: true });
      const response = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });
      set({ user: response.data.user, isAuthenticated: true });
      if (response.data.user.role === "applicant") {
        useApplicantStore.getState().getApplicantDetails();
      }
      if (response.data.user.role === "company") {
        useCompanyStore.getState().retrieveAllData();
      }
      return 200;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed.");
      console.error("Login error:", error);
      return 500;
    } finally {
      set({ isAuthenticatedLoading: false });
    }
  },

  onLogout: async () => {
    try {
      await axiosInstance.get("/api/v1/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  },

  verify: async () => {
    try {
      set({ isAuthenticatedLoading: true });
      const response = await axiosInstance.get("/api/v1/auth/verify");
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
      if (response.data.user.role === "applicant") {
        useApplicantStore.getState().getApplicantDetails();
      }
      if (response.data.user.role === "company") {
        useCompanyStore.getState().retrieveAllData();
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isAuthenticatedLoading: false });
    }
  },
}));

export default useAuthStore;
