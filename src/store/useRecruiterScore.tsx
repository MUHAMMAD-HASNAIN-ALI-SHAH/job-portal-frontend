import { create } from "zustand";
import type { Recruiter } from "../interfaces";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface RecruiterState {
  // States
  recruiter: Recruiter | null; // to store applicant details

  // loaders
  getRecruiterDetailsLoader: boolean; // to track loading state while fetching recruiter details

  // Methods
  getRecruiterDetails: () => Promise<void>; // to update recruiter details
  updateRecruiterDetails: (data: Partial<Recruiter>) => Promise<void>; // to update recruiter details
}

const useRecruiterStore = create<RecruiterState>((set) => ({
  recruiter: null,
  getRecruiterDetailsLoader: false,
  getRecruiterDetails: async () => {
    try {
      set({ getRecruiterDetailsLoader: true });
      const response = await axiosInstance.get("/api/v3/recruiter");
      console.log(response.data);
      set({ recruiter: response.data.recruiter });
      set({ getRecruiterDetailsLoader: false });
    } catch (error) {
      set({ getRecruiterDetailsLoader: false });
      toast.error("Failed to fetch recruiter details");
    }
  },
  updateRecruiterDetails: async (data) => {
    try {
      const response = await axiosInstance.put("/api/v3/recruiter", data);
      set({ recruiter: response.data.recruiter });
    } catch (error) {
      toast.error("Failed to update recruiter details");
    }
  },
}));

export default useRecruiterStore;
