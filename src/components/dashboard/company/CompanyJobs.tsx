import type { DashboardJob, Job } from "../../../interfaces";
import useCompanyStore from "../../../store/useCompanyStore";
import JobCard from "./ui/JobCard";

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

const CompanyJobs = () => {
    let { jobs } = useCompanyStore();

    jobs = jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">All job postings</h2>
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
    )
}

export default CompanyJobs
