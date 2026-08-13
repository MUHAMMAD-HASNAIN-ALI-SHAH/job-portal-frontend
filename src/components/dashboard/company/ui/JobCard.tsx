import { toast } from "react-toastify";
import type { Job } from "../../../../interfaces"
import axiosInstance from "../../../../lib/axios";
import useCompanyStore from "../../../../store/useCompanyStore";
import useNavigationStore from "../../../../store/useNavigationStore";
import { useState } from "react";

const JobCard = ({ job, styles }: { job: Job, styles: any }) => {
    const { setEditJobId } = useNavigationStore();
    const { deleteJob } = useCompanyStore();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axiosInstance.delete(`/api/v4/job/${job._id}`)
            setEditJobId(null);
            deleteJob(job._id);
        } catch (error) {
            console.error("Error deleting job:", error);
            toast.error("Failed to delete job. Please try again.");
        }
        setIsDeleting(false);
    };
    return (
        <div key={job._id} className={`bg-white border border-slate-100 border-l-4 ${styles.accent} rounded-xl p-5 hover:shadow-md transition-all transform hover:scale-[1.01]`}>
            <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">{job.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${styles.badge}`}>
                    {job.status}
                </span>
            </div>

            <p className="text-xs text-slate-500">
                {job.location}
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div>
                    <p className="text-sm font-semibold text-slate-900">{job.applicantsCount}</p>
                    <p className="text-xs text-slate-400">applicants</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400">Posted {new Date(job.postedAt).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-400">Deadline {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            {/* actions */}
            <div className="flex items-center justify-end flex-end gap-2 mt-4">
                <button onClick={() => setEditJobId(job._id)} className="text-xs cursor-pointer font-medium px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400">
                    Edit
                </button>
                <button onClick={handleDelete} disabled={isDeleting} className="text-xs cursor-pointer font-medium px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default JobCard