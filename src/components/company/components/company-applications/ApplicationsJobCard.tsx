import type { Job } from "../../../../interfaces"
import useCompanyNavigationStore from "../../../../store/useCompanyNavigationStore";

const jobStatusStyles: Record<string, string> = {
    active: "bg-green-50 text-green-700",
    draft: "bg-gray-100 text-gray-600",
    closed: "bg-red-50 text-red-700",
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

const ApplicationsJobCard = ({ job }: { job: Job }) => {
    const { setApplicationJobId } = useCompanyNavigationStore();
    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden mb-3 shadow-sm bg-white px-5 py-4">
            <div className="flex items-start justify-between gap-3">
                <div className="text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-base text-gray-900">{job.title}</p>
                        <span
                            className={`text-[11px] px-2 py-0.5 rounded-md capitalize font-medium ${jobStatusStyles[job.status] ?? "bg-gray-100 text-gray-600"
                                }`}
                        >
                            {job.status}
                        </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">{job.location}</p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                            {job.experienceLevel}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                            {job.employmentType}
                        </span>
                        <span className="text-xs font-medium text-green-700">
                            {job.salary}
                        </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1.5">
                        posted {formatDate(job.postedAt)}
                    </p>
                </div>

                <span className="shrink-0 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium">
                    {job.applicantsCount ?? 0} applicants
                </span>
            </div>

            <div className="flex justify-end mt-3">
                <button onClick={() => setApplicationJobId(job._id)} className="text-xs cursor-pointer border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-100 transition-colors font-medium text-gray-700">
                    View Applications
                </button>
            </div>
        </div>
    )
}

export default ApplicationsJobCard
