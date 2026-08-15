import { useState } from "react";
import useCompanyStore from "../../../../store/useCompanyStore";
import axiosInstance from "../../../../lib/axios";
import { toast } from "react-toastify";

const HiredRejectedApplicationActions = ({ application, status }: { application: any; status: string; }) => {
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
    );
};

export default HiredRejectedApplicationActions;
