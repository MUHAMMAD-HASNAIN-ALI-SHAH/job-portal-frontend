import { useNavigate } from "react-router-dom";
import type { Job } from "../../interfaces";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";
import { CheckCircle2, Briefcase, MapPin, DollarSign, Calendar, AlertCircle } from "lucide-react";

export const JobDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-8 animate-pulse">
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-8 border-b">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="h-7 sm:h-8 w-2/3 bg-slate-200 rounded" />
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
              <div className="h-6 w-28 bg-slate-200 rounded-full" />
            </div>
          </div>
          <div className="h-11 w-full lg:w-32 bg-slate-200 rounded-lg shrink-0" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-2">
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
          ))}
        </section>

        <section>
          <div className="h-5 w-40 bg-slate-200 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-200 rounded" />
            <div className="h-3 w-5/6 bg-slate-200 rounded" />
            <div className="h-3 w-2/3 bg-slate-200 rounded" />
          </div>
        </section>

        <section>
          <div className="h-5 w-32 bg-slate-200 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-3 w-4/5 bg-slate-200 rounded" />
            <div className="h-3 w-3/5 bg-slate-200 rounded" />
            <div className="h-3 w-2/5 bg-slate-200 rounded" />
          </div>
        </section>

        <section>
          <div className="h-5 w-36 bg-slate-200 rounded mb-3" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-slate-200 rounded-full" />
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
            <div className="h-6 w-14 bg-slate-200 rounded-full" />
            <div className="h-6 w-24 bg-slate-200 rounded-full" />
          </div>
        </section>

        <div className="pt-2">
          <div className="h-12 w-full bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const DetailStat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="border border-slate-200 rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm sm:text-base font-semibold text-slate-800 mt-0.5 truncate">{value}</p>
    </div>
  </div>
);

export const JobDetailsCard = ({ job, alreadyApplied }: { job: Job; alreadyApplied: boolean }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleApply = () => {
    if (!job) return;
    if (!isAuthenticated) {
      toast.error("Please login to apply for this job.");
      return;
    }
    navigate(`/job/${job._id}/apply`);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {alreadyApplied && (
        <div className="px-4 sm:px-8 pt-4 sm:pt-6">
          <div className="flex items-center gap-3 w-full rounded-xl border border-green-100 bg-green-50/60 px-3 sm:px-4 py-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="text-green-700 text-sm font-medium">You have already applied for this job.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-4 sm:p-8 border-b">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold tracking-wide uppercase mb-2">
              <Briefcase className="h-3.5 w-3.5" />
              {job.employmentType}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 break-words">{job.title}</h1>

            <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm font-medium">
                {job.experienceLevel}
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                {job.employmentType}
              </span>
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs sm:text-sm font-medium">
                {job.location}
              </span>
            </div>
          </div>

          <button
            onClick={handleApply}
            disabled={alreadyApplied}
            className={`${
              alreadyApplied ? "bg-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } w-full lg:w-auto text-white px-6 py-3 rounded-lg font-medium transition shrink-0`}
          >
            {alreadyApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
        {/* Quick facts */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <DetailStat icon={<Briefcase className="h-4 w-4" />} label="Employment Type" value={job.employmentType} />
          <DetailStat icon={<Calendar className="h-4 w-4" />} label="Experience" value={job.experienceLevel} />
          <DetailStat icon={<DollarSign className="h-4 w-4" />} label="Salary" value={job.salary || "Not specified"} />
          <DetailStat icon={<MapPin className="h-4 w-4" />} label="Location" value={job.location} />
        </section>

        {/* Description */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Job Description</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </section>

        {/* Requirements */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Skills Required</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-slate-100 rounded-full text-xs sm:text-sm text-slate-700 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Deadline */}
        {job.applicationDeadline && (
          <section>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-medium text-amber-800 text-sm sm:text-base">Application Deadline</p>
                <p className="text-amber-700 text-xs sm:text-sm mt-0.5">
                  {new Date(job.applicationDeadline).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Apply Button Bottom */}
        <div className="pt-2">
          <button
            onClick={handleApply}
            disabled={alreadyApplied}
            className={`${
              alreadyApplied ? "bg-slate-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } w-full text-white py-3 rounded-lg font-medium transition`}
          >
            {alreadyApplied ? "Already Applied" : "Apply For This Job"}
          </button>
        </div>
      </div>
    </div>
  );
};