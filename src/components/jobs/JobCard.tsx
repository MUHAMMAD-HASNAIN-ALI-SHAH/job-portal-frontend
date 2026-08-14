import type { CompanyInterface, Job } from "../../interfaces";
import { MapPin, Briefcase, Clock, Users, Eye } from "lucide-react";
import { CompanyAvatar, statusStyles } from "./AllJobsItems";
import { useNavigate } from "react-router-dom";

const timeAgo = (dateString: string) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
};

const JobCard = ({ job }: { job: Job }) => {
    const company = job.company as CompanyInterface;
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-start gap-3 mb-3">
                <CompanyAvatar company={company} />
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-slate-900 leading-snug">{job.title}</h3>
                        <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statusStyles[job.status]}`}
                        >
                            {job.status}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{company.name}</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" /> {job.employmentType}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {timeAgo(job.postedAt)}
                </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3">
                {job.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {job.skills.slice(0, 4).map((skill) => (
                    <span
                        key={skill}
                        className="bg-indigo-50 text-indigo-700 text-[11px] font-medium px-2 py-0.5 rounded-full"
                    >
                        {skill}
                    </span>
                ))}
                {job.skills.length > 4 && (
                    <span className="text-[11px] text-slate-400 px-1 py-0.5">
                        +{job.skills.length - 4} more
                    </span>
                )}
            </div>

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {job.applicantsCount}
                    </span>
                    <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> {job.views}
                    </span>
                    {job.salary && <span className="font-medium text-slate-700">{job.salary}</span>}
                </div>
                <button onClick={() => navigate(`/job/${job._id}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-md transition-colors shrink-0">
                    Apply
                </button>
            </div>
        </div>
    );
};

export default JobCard;