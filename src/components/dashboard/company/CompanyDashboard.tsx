import type { DashboardCandidate, DashboardJob, Job } from '../../../interfaces';
import useCompanyStore from '../../../store/useCompanyStore';
import JobCard from './ui/JobCard';
import useNavigationStore from '../../../store/useNavigationStore';

const jobStatusStyles: Record<
  DashboardJob["status"],
  { accent: string; badge: string; iconBg: string }
> = {
  Active: {
    accent: "border-l-green-500",
    badge: "bg-green-50 text-green-700",
    iconBg: "bg-green-50 text-green-600",
  },
  Closed: {
    accent: "border-l-slate-300",
    badge: "bg-slate-100 text-slate-500",
    iconBg: "bg-slate-100 text-slate-500",
  },
  Draft: {
    accent: "border-l-amber-400",
    badge: "bg-amber-50 text-amber-700",
    iconBg: "bg-amber-50 text-amber-600",
  },
};

const CANDIDATES: DashboardCandidate[] = [
  { id: "1", name: "Ayesha Khan", role: "Frontend Developer", appliedFor: "Senior Frontend Engineer", appliedAt: "2 hours ago", status: "New" },
  { id: "2", name: "Hamza Tariq", role: "UI/UX Designer", appliedFor: "Product Designer", appliedAt: "5 hours ago", status: "Shortlisted" },
  { id: "3", name: "Sara Ahmed", role: "Backend Developer", appliedFor: "Backend Engineer (Node.js)", appliedAt: "1 day ago", status: "New" },
  { id: "4", name: "Bilal Chaudhry", role: "QA Engineer", appliedFor: "QA Engineer", appliedAt: "2 days ago", status: "Rejected" },
  { id: "5", name: "Mahnoor Fatima", role: "Frontend Developer", appliedFor: "Senior Frontend Engineer", appliedAt: "3 days ago", status: "Hired" },
];

const candidateStatusStyles: Record<DashboardCandidate["status"], string> = {
  New: "bg-indigo-50 text-indigo-700",
  Shortlisted: "bg-blue-50 text-blue-700",
  Rejected: "bg-red-50 text-red-600",
  Hired: "bg-green-50 text-green-700",
};

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const CompanyDashboard = () => {
  let { jobs } = useCompanyStore();
  const { setSidebarMenu } = useNavigationStore();
  const STATS = [
    { label: "Active jobs", value: jobs.filter((job) => job.status === "active").length.toString() },
    { label: "Total applicants", value: jobs.reduce((acc, job) => acc + job.applicantsCount, 0).toString() },
    { label: "Shortlisted", value: "23" },
    { label: "Hired this month", value: "4" },
  ];

  jobs = jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back — here's what's happening with your jobs.
          </p>
        </div>
        <button onClick={() => setSidebarMenu("add-job")} className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors w-fit">
          + Post a new job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-100 rounded-xl p-5">
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Job postings — card grid, color-coded by status */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recents job</h2>
          <a onClick={() => setSidebarMenu("my-jobs")} className="text-sm text-indigo-600 hover:underline font-medium select-none cursor-pointer">
            View all
          </a>
        </div>

        {/* Legend so the color coding is self-explanatory */}
        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Active
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Draft
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-300" /> Closed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job: Job) => {
            const styles = jobStatusStyles[job.status.at(0)?.toUpperCase() + job.status.slice(1) as DashboardJob["status"]];
            return (
              <JobCard key={job._id} job={job} styles={styles} />
            );
          })}
        </div>
      </div>

      {/* Recent candidates — list rows */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">Recent candidates</h2>
          <a href="/dashboard/candidates" className="text-xs text-indigo-600 hover:underline font-medium">
            View all
          </a>
        </div>

        <div className="divide-y divide-slate-100">
          {CANDIDATES.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold flex items-center justify-center shrink-0">
                  {getInitials(candidate.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{candidate.name}</p>
                  <p className="text-xs text-slate-500 truncate">
                    Applied for {candidate.appliedFor} · {candidate.appliedAt}
                  </p>
                </div>
              </div>

              <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${candidateStatusStyles[candidate.status]}`}>
                {candidate.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
