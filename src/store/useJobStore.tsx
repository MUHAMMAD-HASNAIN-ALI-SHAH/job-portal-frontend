import { create } from "zustand";
import type { Job } from "../interfaces";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";

interface JobState {
    // Menu
    jobs: Job[];

    // loaders
    getJobsLoader: boolean;

    // Setters
    getAllJobs: (query: string, selectedCity: string) => Promise<void>;
}

const useJobStore = create<JobState>((set) => ({
    jobs: [],
    getJobsLoader: false,

    getAllJobs: async (query: string, selectedCity: string) => {
        try {
            set({ getJobsLoader: true });

            const params = new URLSearchParams();
            if (query.trim()) params.set("search", query.trim());
            if (selectedCity.trim()) params.set("location", selectedCity.trim());

            const res = await axiosInstance.get(`/api/v4/job/all?${params.toString()}`);
            set({ jobs: res.data });
        } catch (error) {
            toast.error("Failed to fetch jobs");
            console.error("Failed to fetch jobs:", error);
        } finally {
            set({ getJobsLoader: false });
        }
    },
}));

export default useJobStore;
