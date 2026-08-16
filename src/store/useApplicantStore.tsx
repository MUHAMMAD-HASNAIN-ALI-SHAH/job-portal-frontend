import { create } from "zustand";
import type { Applicant, Application, ResumeData } from "../interfaces";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import readFileAsBase64 from "../lib/base64";

interface ApplicantState {
  // States
  applicant: Applicant | null;
  resume: ResumeData | null;
  applications: Application[];

  // loaders
  getApplicantDetailsLoader: boolean;
  getResumeLoader: boolean;
  resumeUploadLoader: boolean;
  getApplicationsLoader: boolean;
  deleteResumeLoader: boolean;

  // Methods
  getApplicantDetails: () => Promise<void>;
  updateApplicantDetails: (data: Partial<Applicant>) => Promise<void>;
  getUserResume: () => Promise<void>;
  uploadResume: (file: File) => Promise<void>;
  getMyApplications: () => Promise<void>;
  deleteResume: () => Promise<void>;
}

const useApplicantStore = create<ApplicantState>((set) => ({
  applicant: null,
  resume: null,
  applications: [],

  getApplicantDetailsLoader: false,
  getResumeLoader: false,
  resumeUploadLoader: false,
  getApplicationsLoader: false,
  deleteResumeLoader: false,

  getApplicantDetails: async () => {
    try {
      set({ getApplicantDetailsLoader: true });
      const response = await axiosInstance.get("/api/v3/applicant");
      set({ applicant: response.data });
      set({ getApplicantDetailsLoader: false });
    } catch (error) {
      set({ getApplicantDetailsLoader: false });
      toast.error("Failed to fetch applicant details");
    }
  },
  updateApplicantDetails: async (data) => {
    try {
      set({ applicant: data as Applicant });
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to update applicant details");
    }
  },
  getUserResume: async () => {
    try {
      set({ getResumeLoader: true });
      const res = await axiosInstance.get("/api/v5/resume");

      if (res.data) {
        set({
          resume: {
            resumeUrl: res.data.resumeUrl,
            fileName: res.data.fileName || "resume.pdf",
          }
        });
      }
    } catch (err: any) {
      console.error("Failed to fetch resume:", err?.response?.data || err.message);
    } finally {
      set({ getResumeLoader: false });
    }
  },
  uploadResume: async (file) => {
    try {
      set({ resumeUploadLoader: true });
      const base64 = await readFileAsBase64(file);
      const res = await axiosInstance.put("/api/v5/resume", {
        resumeBase64: base64,
        fileName: file.name,
      });

      set({
        resume: {
          resumeUrl: res.data.resumeUrl,
          fileName: res.data.fileName || file.name,
        }
      });

      toast.success("Resume uploaded successfully");

    } catch (err: any) {
      console.error("Resume upload failed:", err?.response?.data || err.message);
      toast.error(err?.response?.data?.msg || "Failed to upload resume");
    } finally {
      set({ resumeUploadLoader: false });
    }
  },
  getMyApplications: async () => {
    try {
      set({ getApplicationsLoader: true });
      const response = await axiosInstance.get("/api/v6/application/applicant");
      set({ applications: response.data });
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      set({ getApplicationsLoader: false });
    }
  },
  deleteResume: async () => {
    try {
      set({ deleteResumeLoader: true });
      await axiosInstance.delete("/api/v5/resume");
      set({ resume: null });
      toast.success("Resume deleted successfully");
    } catch (err: any) {
      console.error("Failed to delete resume:", err?.response?.data || err.message);
      toast.error(err?.response?.data?.msg || "Failed to delete resume");
    } finally {
      set({ deleteResumeLoader: false });
    }
  },
}));

export default useApplicantStore;
