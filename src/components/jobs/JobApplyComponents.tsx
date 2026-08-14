import { type FormEvent } from "react";
import { SearchX, UploadCloud, CheckCircle2 } from "lucide-react";
import type { Job } from "../../interfaces";
import Navbar from "../Navbar";
import Footer from "../Footer";
import useApplicantStore from "../../store/useApplicantStore";

export interface ApplyFormErrors {
  coverLetter?: string;
  resume?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  submitError?: string;
}

export const JobApplySkeleton = () => (
  <>
    <Navbar />
    <div className="max-w-7xl mx-auto py-8 px-4 animate-pulse">
      <div className="h-4 w-28 bg-slate-200 rounded mb-4" />
      <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-slate-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-2/3 bg-slate-200 rounded" />
            <div className="h-3.5 w-1/3 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="h-3 w-full bg-slate-200 rounded" />
          <div className="h-24 w-full bg-slate-200 rounded" />
          <div className="h-10 w-full bg-slate-200 rounded" />
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export const JobApplyError = ({ error }: { error: string | null }) => (
  <>
    <Navbar />
    <div className="max-w-7xl mx-auto py-16 px-4">
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
    <Footer />
  </>
);

export const JobApplySuccess = ({
  jobTitle,
  onBrowseMore,
  onViewJob,
}: {
  jobTitle: string;
  onBrowseMore: () => void;
  onViewJob: () => void;
}) => (
  <>
    <Navbar />
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="bg-white rounded-2xl border shadow-sm p-12 text-center flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Application submitted</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-sm">
          Your application for <span className="font-medium text-gray-700">{jobTitle}</span> has been
          sent. The company will get back to you if there's a match.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onBrowseMore}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            Browse more jobs
          </button>
          <button
            onClick={onViewJob}
            className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            View job
          </button>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export const JobSummaryHeader = ({ job }: { job: Job }) => (
  <div className="p-6 sm:p-8 border-b bg-slate-50/60">
    <p className="text-xs font-medium text-indigo-600 mb-1">Applying for</p>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{job.title}</h1>
    <div className="flex flex-wrap gap-2 mt-3">
      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
        {job.experienceLevel}
      </span>
      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
        {job.employmentType}
      </span>
      <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
        {job.location}
      </span>
    </div>
  </div>
);

export const AlreadyResumeUi = () => {
  const { resume } = useApplicantStore();

  if (!resume) return null;

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4">
        <div className="flex items-center gap-3 w-full rounded-xl border border-green-100 bg-green-50/60 px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">Resume already uploaded</p>
            <p className="text-xs text-slate-500 mt-0.5">You can replace it below if you'd like to use a different one.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ApplyFormProps {
  coverLetter: string;
  setCoverLetter: (value: string) => void;
  resume: File | null;
  onResumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  expectedSalary: string;
  setExpectedSalary: (value: string) => void;
  noticePeriod: string;
  setNoticePeriod: (value: string) => void;
  errors: ApplyFormErrors;
  clearError: (field: keyof ApplyFormErrors) => void;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
}

export const ApplyForm = ({
  coverLetter,
  setCoverLetter,
  resume,
  onResumeChange,
  expectedSalary,
  setExpectedSalary,
  noticePeriod,
  setNoticePeriod,
  errors,
  clearError,
  isSubmitting,
  onSubmit,
}: ApplyFormProps) => {

  return (
    <form onSubmit={onSubmit} noValidate className="p-6 sm:p-8 space-y-5">
      {errors.submitError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-3 py-2">
          {errors.submitError}
        </div>
      )}

      <div className="text-left">
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
          Resume
        </label>
        <label
          htmlFor="resume"
          className={`flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed px-4 py-8 text-sm cursor-pointer transition-colors ${errors.resume
            ? "border-red-300 bg-red-50/40"
            : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
            }`}
        >
          <UploadCloud className="h-6 w-6 text-slate-400" />
          <span className="text-slate-600">
            {resume ? resume.name : "Click to upload your resume (PDF, DOC)"}
          </span>
        </label>
        <input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={onResumeChange} className="hidden" />
        {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
      </div>

      <div className="text-left">
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
          Cover letter
        </label>
        <textarea
          id="coverLetter"
          rows={6}
          value={coverLetter}
          onChange={(e) => {
            setCoverLetter(e.target.value);
            clearError("coverLetter");
          }}
          placeholder="Tell the company why you're a great fit for this role..."
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 resize-none ${errors.coverLetter
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
            }`}
        />
        <div className="flex justify-between mt-1">
          {errors.coverLetter && <p className="text-red-500 text-xs">{errors.coverLetter}</p>}
          <p className="text-xs text-gray-400 ml-auto">{coverLetter.length}/3000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="text-left">
          <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">
            Expected salary <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="expectedSalary"
            type="number"
            min={0}
            value={expectedSalary}
            onChange={(e) => {
              setExpectedSalary(e.target.value);
              clearError("expectedSalary");
            }}
            placeholder="e.g. 150000"
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 ${errors.expectedSalary
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
              }`}
          />
          {errors.expectedSalary && <p className="text-red-500 text-xs mt-1">{errors.expectedSalary}</p>}
        </div>

        <div className="text-left">
          <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
            Notice period (days) <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="noticePeriod"
            type="number"
            min={0}
            value={noticePeriod}
            onChange={(e) => {
              setNoticePeriod(e.target.value);
              clearError("noticePeriod");
            }}
            placeholder="e.g. 30"
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 ${errors.noticePeriod
              ? "border-red-400 focus:ring-red-200"
              : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
              }`}
          />
          {errors.noticePeriod && <p className="text-red-500 text-xs mt-1">{errors.noticePeriod}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg py-3 text-sm transition-colors"
      >
        {isSubmitting && (
          <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        {isSubmitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  )
};