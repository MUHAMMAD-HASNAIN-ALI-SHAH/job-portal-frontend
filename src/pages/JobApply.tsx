import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import type { Job } from "../interfaces";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  AlreadyResumeUi,
  ApplyForm,
  JobApplyError,
  JobApplySkeleton,
  JobApplySuccess,
  JobSummaryHeader,
  type ApplyFormErrors,
} from "../components/jobs/JobApplyComponents";
import useApplicantStore from "../store/useApplicantStore";

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read resume file."));
    reader.readAsDataURL(file);
  });
};

const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resume: myResume } = useApplicantStore();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("");
  const [errors, setErrors] = useState<ApplyFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

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

  const clearError = (field: keyof ApplyFormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;

    if (selectedFile) {
      try {
        setResume(selectedFile);
        setErrors((prev) => ({ ...prev, resume: undefined }));
      } catch (err) {
        console.error("Error reading resume file:", err);
        setErrors((prev) => ({ ...prev, resume: "Failed to read resume file." }));
      }
    }
  };

  const validate = (): boolean => {
    const nextErrors: ApplyFormErrors = {};

    if (!coverLetter.trim()) {
      nextErrors.coverLetter = "A short cover letter helps your application stand out.";
    } else if (coverLetter.length > 3000) {
      nextErrors.coverLetter = "Cover letter must be under 3000 characters.";
    }

    if (!resume && !myResume) {
      nextErrors.resume = "Please attach your resume.";
    }

    if (expectedSalary && Number(expectedSalary) < 0) {
      nextErrors.expectedSalary = "Expected salary can't be negative.";
    }

    if (noticePeriod && Number(noticePeriod) < 0) {
      nextErrors.noticePeriod = "Notice period can't be negative.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, submitError: undefined }));

    if (!validate() || !job) return;

    setIsSubmitting(true);

    const resumeBase64 = resume ? await readFileAsBase64(resume) : null;

    try {
      const payload = {
        jobId: job._id,
        coverLetter,
        resume: resumeBase64 || "",
        fileName: resume?.name || "",
        expectedSalary: expectedSalary ? Number(expectedSalary) : undefined,
        noticePeriod: noticePeriod ? Number(noticePeriod) : undefined,
      };

      console.log("Submitting application with payload:", payload);

      await axiosInstance.post(`/api/v6/application`, payload);

      toast.success("Application submitted successfully");
      setSubmitted(true);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to submit application. Please try again.";
      setErrors((prev) => ({ ...prev, submitError: message }));
      toast.error(message);
      console.error("Application submission failed:", err?.response?.data || err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <JobApplySkeleton />;
  if (error || !job) return <JobApplyError error={error} />;

  if (submitted) {
    return (
      <JobApplySuccess
        jobTitle={job.title}
        onBrowseMore={() => navigate("/all-jobs")}
        onViewJob={() => navigate(`/job/${job._id}`)}
      />
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <button
          onClick={() => navigate(`/job/${job._id}`)}
          className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          Back to job details
        </button>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <JobSummaryHeader job={job} />
          <AlreadyResumeUi />
          <ApplyForm
            coverLetter={coverLetter}
            setCoverLetter={setCoverLetter}
            resume={resume}
            onResumeChange={handleResumeChange}
            expectedSalary={expectedSalary}
            setExpectedSalary={setExpectedSalary}
            noticePeriod={noticePeriod}
            setNoticePeriod={setNoticePeriod}
            errors={errors}
            clearError={clearError}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobApply;