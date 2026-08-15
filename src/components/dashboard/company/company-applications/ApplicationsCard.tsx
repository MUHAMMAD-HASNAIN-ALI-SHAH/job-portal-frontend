import { useState } from "react";
import ApplicantSummary from "./ApplicantSummary";
import ExpandedApplicationDetails from "./ExpandedApplicationDetails";
import InterviewScheduledPanel from "./InterviewScheduledPanel";
import useCompanyStore from "../../../../store/useCompanyStore";
import axiosInstance from "../../../../lib/axios";
import { toast } from "react-toastify";
import ScheduleInterviewForm from "./ScheduleInterviewForm";

const ApplicationsCard = ({ application }: { application: any }) => {
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
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5">
                <div className="flex flex-col gap-4">
                    <ApplicantSummary application={application} status={status} expanded={expanded} setStatus={setStatus} setExpanded={setExpanded} />
                    <div className="flex flex-col gap-3 w-full">
                        {showScheduleForm && <ScheduleInterviewForm application={application} />}
                    </div>
                    {(status === "hired" || status === "rejected") && application.status === "shortlisted" &&
                        <div className="flex flex-end justify-end">
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => handleStatusChange(status === "hired" ? "hired" : "rejected")}
                                className={`inline-flex items-center justify-center rounded-md border bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Save
                            </button>
                        </div>
                    }
                    {expanded && <ExpandedApplicationDetails application={application} />}
                </div>
            </div>

            {application.status === "shortlisted" && <InterviewScheduledPanel application={application} />}
        </div>
    )
}

export default ApplicationsCard;
