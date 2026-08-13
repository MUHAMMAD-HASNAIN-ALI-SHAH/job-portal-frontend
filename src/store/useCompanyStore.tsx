import { create } from "zustand";
import type { CompanyInterface, Job } from "../interfaces";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface CompanyState {
  company: CompanyInterface | null; // to store company details
  jobs: Job[];

  // loaders
  getCompanyDetailsLoader: boolean; // to track loading state while fetching company details
  getJobsLoader: boolean; // to track loading state while fetching jobs

  // Methods
  getCompanyDetails: () => Promise<void>; // to update company details
  getJobs: () => Promise<void>; // to fetch jobs
  addJob: (job: Job) => void; // to add a new job to the jobs array
  updateJob: (jobId: string, updatedJob: Partial<Job>) => void; // to update a specific job in the jobs array
  deleteJob: (jobId: string) => void; // to delete a specific job from the jobs array
  updateCompanyDetails: (data: Partial<CompanyInterface>) => Promise<void>; // to update company details in the store
}

const useCompanyStore = create<CompanyState>((set) => ({
  company: null,
  jobs: [],
  getCompanyDetailsLoader: false,
  getJobsLoader: false,
  getCompanyDetails: async () => {
    try {
      set({ getCompanyDetailsLoader: true });
      const response = await axiosInstance.get("/api/v2/company");
      set({ company: response.data });
    } catch (error) {
      toast.error("Failed to fetch company details");
    } finally {
      set({ getCompanyDetailsLoader: false });
    }
  },
  updateCompanyDetails: async (data) => {
    try {
      set({ company: data as CompanyInterface });
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to update company details");
    }
  },
  getJobs: async () => {
    try {
      set({ getJobsLoader: true });
      const response = await axiosInstance.get("/api/v4/job");
      set({ jobs: response.data });
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      set({ getJobsLoader: false });
    }
  },
  addJob: (job) => {
    set((state) => ({ jobs: [job, ...state.jobs] }));
  },
  updateJob: (jobId, updatedJob) => {
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job._id === jobId ? { ...job, ...updatedJob } : job
      ),
    }));
  },
  deleteJob: (jobId) => {
    set((state) => ({
      jobs: state.jobs.filter((job) => job._id !== jobId),
    }));
  }
}));

export default useCompanyStore;
