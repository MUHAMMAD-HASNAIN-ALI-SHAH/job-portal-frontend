import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import type { Job } from "../interfaces";
import useApplicantStore from "../store/useApplicantStore";
import type { ApplyFormErrors } from "../components/jobs/ApplyJobComponents";

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read resume file."));
    reader.readAsDataURL(file);
  });
};

export const useJobApply = () => {
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

  const hasResumeOnFile = Boolean(myResume) || Boolean(resume);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get(`/api/v4/job/${id}`);
        setJob(res.data.job);
        if(res.data.applied) {
          setSubmitted(true);
          navigate(`/job/${id}`);
        }
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

    if (!hasResumeOnFile) {
      nextErrors.resume = "Please attach your resume.";
    }

    if (expectedSalary && Number(expectedSalary) <= 0) {
      nextErrors.expectedSalary = "Expected salary can't be negative and zero.";
    }

    if (noticePeriod && Number(noticePeriod) <= 0) {
      nextErrors.noticePeriod = "Notice period can't be negative and zero.";
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
      console.log("Submitting application for job ID:", job);
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

  return {
    job,
    isLoading,
    error,
    coverLetter,
    setCoverLetter,
    expectedSalary,
    setExpectedSalary,
    noticePeriod,
    setNoticePeriod,
    errors,
    isSubmitting,
    submitted,
    resume,
    myResume,
    hasResumeOnFile,
    clearError,
    handleResumeChange,
    handleSubmit,
    navigate,
    id
  };
};