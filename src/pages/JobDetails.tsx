import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import type { Job } from "../interfaces";
import { JobDetailsCard, JobDetailsSkeleton } from "../components/jobs/JobDetailsItems";
import { ArrowLeft, SearchX } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get(`/api/v4/job/${id}`);
        setJob(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.msg || "Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (error || !job) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4">
        <div className="bg-white rounded-2xl border shadow-sm p-12 text-center flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
            <SearchX className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {error ? "Something went wrong" : "Job not found"}
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-sm">
            {error || "This job listing may have been removed or the link is incorrect."}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-8 px-4">
        <button
          onClick={() => navigate("/all-jobs")}
          className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>
        <JobDetailsCard job={job} />
      </div>
      <Footer />
    </>
  );
};

export default JobDetails;