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
} from "../components/jobs/ApplyJobComponents";
import { useJobApply } from "../hooks/useJobApply";

const ApplyJob = () => {
  const {
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
    clearError,
    handleResumeChange,
    handleSubmit,
    navigate,
  } = useJobApply();

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
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6">
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

export default ApplyJob;