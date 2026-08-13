import { create } from "zustand";
import type { Applicant, Resume } from "../interfaces";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface ApplicantState {
  // States
  applicant: Applicant | null;
  resume: Resume | null;

  // loaders
  getApplicantDetailsLoader: boolean;
  uploadResumeLoader: boolean;
  getResumeLoader: boolean;

  // Methods
  getApplicantDetails: () => Promise<void>;
  uploadResume: (base64File: string, fileName: string) => Promise<void>;
  getUserResume: () => Promise<void>;
}

const useApplicantStore = create<ApplicantState>((set) => ({
  applicant: null,
  resume: null,
  getApplicantDetailsLoader: false,
  uploadResumeLoader: false,
  getResumeLoader: false,
  getApplicantDetails: async () => {
    try {
      set({ getApplicantDetailsLoader: true });
      const response = await axiosInstance.get("/api/v2/applicant");
      set({ applicant: response.data.applicant });
      set({ getApplicantDetailsLoader: false });
      await useApplicantStore.getState().getUserResume();
    } catch (error) {
      set({ getApplicantDetailsLoader: false });
      toast.error("Failed to fetch applicant details");
    }
  },
  uploadResume: async (base64File, fileName) => {
    try {
      set({ uploadResumeLoader: true });
      const resume = await axiosInstance.post("/api/v2/applicant/resume", {
        base64: base64File,
        fileName: fileName,
      });
      set({ resume: resume.data.resume });
      set({ uploadResumeLoader: false });
      toast.success("Resume uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload resume");
      set({ uploadResumeLoader: false });
    }
  },
  getUserResume: async () => {
    try {
      set({ getResumeLoader: true });
      const response = await axiosInstance.get("/api/v2/applicant/resume");
      if(response.data.resume){
      set({ resume: response.data.resume });
      }
      set({ getResumeLoader: false });
    } catch (error) {
      toast.error("Failed to fetch resume");
      set({ getResumeLoader: false });
    }
  },
}));

export default useApplicantStore;
