import { create } from "zustand";
import type { Applicant, Resume } from "../interfaces";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface ApplicantState {
  // States
  applicant: Applicant | null; // to store applicant details
  resume: Resume | null; // to store applicant resume details

  // loaders
  getApplicantDetailsLoader: boolean; // to track loading state while fetching applicant details
  uploadResumeLoader: boolean; // to track loading state while uploading resume
  getResumeLoader: boolean; // to track loading state while fetching resume

  // Methods
  getApplicantDetails: () => Promise<void>; // to update applicant details
  uploadResume: (base64File: string, fileName: string) => Promise<void>; // to upload resume
  getUserResume: () => Promise<void>; // to fetch user resume
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
