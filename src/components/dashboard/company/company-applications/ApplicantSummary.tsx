import { ChevronDown } from "lucide-react";

const statusStyles: Record<string, string> = {
    applied: "bg-indigo-50 text-indigo-700",
    shortlisted: "bg-purple-50 text-purple-700",
    hired: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-600",
};

const getStatusColor = (status: string) => statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";

const ApplicantSummary = ({ application, status, expanded, setStatus, setExpanded }: { application: any; status: string; expanded: boolean, setStatus: (status: string) => void, setExpanded: (expanded: boolean) => void }) => {
    return (
        <div className="flex flex-col justify-between w-full items-start gap-3">
            <div className="flex items-start justify-between gap-3 w-full min-w-0">
                <div className="flex items-start gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold flex items-center justify-center shrink-0">
                        {(application.applicantId?.fullName || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-slate-900 truncate">
                            {application.applicantId?.fullName || "Unknown Applicant"}
                        </h2>
                        <p className="text-sm text-slate-500">
                            Applied for <span className="font-medium text-slate-700">{application.jobId?.title}</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Applied on {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                        {application.status === "applied" && <option value="applied">Applied</option>}
                        <option value="shortlisted">Shortlisted</option>
                        {application.status !== "applied" && <option value="rejected">Rejected</option>}
                        {application.status !== "applied" && <option value="hired">Hired</option>}
                    </select>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center justify-center gap-1 px-4 py-1.5 border border-slate-300 rounded-md text-sm hover:bg-slate-50 transition-colors"
                    >
                        {expanded ? "Hide" : "Details"}
                        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Show resume */}
            {(application.status === "applied" || application.status === "shortlisted") && <div className="flex justify-end w-full">
                <button
                    onClick={() => window.open(application.resume, "_blank", "noopener,noreferrer")}
                    disabled={!application.resume}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
                >
                    Show Resume
                </button>
            </div>}
        </div>
    )
}

export default ApplicantSummary