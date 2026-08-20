import { useState } from "react";
import InterviewScheduledPanel from "./InterviewScheduledPanel";
import useCompanyStore from "../../../../store/useCompanyStore";
import axiosInstance from "../../../../lib/axios";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import ResumePreview from "../../../ResumePreview";
import ScheduleInterviewForm from "./ScheduleInterviewForm";
import ATSMatchCard from "./ATSMatchCard";
import ExpandedApplicationDetails from "./ExpandedApplicationDetails";

const statusStyles: Record<string, string> = {
    applied: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100",
    shortlisted: "bg-purple-50 text-purple-700 ring-1 ring-purple-100",
    hired: "bg-green-50 text-green-700 ring-1 ring-green-100",
    rejected: "bg-red-50 text-red-600 ring-1 ring-red-100",
};

const getStatusColor = (status: string) => statusStyles[status?.toLowerCase()] || "bg-gray-100 text-gray-700 ring-1 ring-gray-200";

const JobApplicationsCard = ({ application }: { application: any }) => {
    const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
    const [status, setStatus] = useState(application.status || "applied");
    const [expanded, setExpanded] = useState(false);

    const showScheduleForm = application.status !== "shortlisted" && status === "shortlisted";

    const { editApplication } = useCompanyStore();
    const [isSaving, setIsSaving] = useState(false);

    const handleStatusChange = async (newStatus: "hired" | "rejected") => {
        try {
            setIsSaving(true);
            await axiosInstance.put(`/api/v6/application/status`, {
                applicationId: application._id,
                status: newStatus,
            });

            let updatedData: any = { ...application, status: newStatus };

            editApplication(application._id, updatedData);
            toast.success(`Application marked as ${newStatus}.`);
        } catch (error: any) {
            console.error(`Failed to update application status to ${newStatus}:`, error);
            toast.error(error.response?.data?.msg || `Failed to update application status to ${newStatus}.`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col gap-5">

                    {/* applicant summary */}
                    <div className="flex flex-col justify-between w-full items-start gap-3">
                        <div className="flex items-start justify-between gap-3 w-full min-w-0">
                            <div className="flex items-start gap-3.5 min-w-0">
                                <div className="h-11 w-11 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 text-white text-sm font-semibold flex items-center justify-center shrink-0 shadow-sm">
                                    {(application.applicantId?.fullName || "?").charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-base font-semibold text-slate-900 truncate">
                                        {application.applicantId?.fullName || "Unknown Applicant"}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-0.5">
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
                                    disabled={application.status === "hired" || application.status === "rejected"}
                                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-shadow"
                                >
                                    {application.status === "applied" && (
                                        <>
                                            <option value="applied">Applied</option>
                                            <option value="shortlisted">Shortlisted</option>
                                            <option value="hired">Hired</option>
                                            <option value="rejected">Rejected</option>
                                        </>
                                    )}
                                    {application.status === "shortlisted" && (
                                        <>
                                            <option value="shortlisted">Shortlisted</option>
                                            <option value="hired">Hired</option>
                                            <option value="rejected">Rejected</option>
                                        </>
                                    )}
                                    {application.status === "hired" && <option value="hired">Hired</option>}
                                    {application.status === "rejected" && <option value="rejected">Rejected</option>}
                                </select>

                                <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="flex items-center justify-center gap-1 px-4 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                                >
                                    {expanded ? "Hide" : "Details"}
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                                </button>
                            </div>
                        </div>
                        {(status === "hired" || status === "rejected") && application.status !== status &&
                            <div className="flex w-full flex-end justify-end">
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => handleStatusChange(status === "hired" ? "hired" : "rejected")}
                                    className={`inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        }
                    </div>

                    {/* ats match card */}
                    {(application.status === "applied" || application.status === "shortlisted") && <ATSMatchCard application={application} />}

                    {/* show resume button */}
                    <div className="flex flex-col gap-2">
                        {(application.status === "applied" || application.status === "shortlisted") && <div className="flex justify-end w-full">
                            <button
                                onClick={() => setResumePreviewOpen(true)}
                                disabled={!application.resumeId}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
                            >
                                Show Resume
                            </button>
                        </div>}
                        {resumePreviewOpen && <ResumePreview onClose={() => setResumePreviewOpen(false)} resumeFile={application.resumeId?.resumeUrl || ""} />}
                    </div>

                    {/* schedule interview form */}
                    {showScheduleForm && <ScheduleInterviewForm application={application} />}

                    {/* Expanded applications details */}
                    {expanded && <ExpandedApplicationDetails application={application} />}
                </div>
            </div>

            {application.status === "shortlisted" && <InterviewScheduledPanel application={application} />}
        </div>
    )
}

export default JobApplicationsCard;
