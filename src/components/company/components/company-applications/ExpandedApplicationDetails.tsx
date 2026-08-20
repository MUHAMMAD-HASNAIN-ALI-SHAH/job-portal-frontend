import type { Application } from "../../../../interfaces"

const ExpandedApplicationDetails = ({ application }: { application: Application }) => {
    return (
        <div className="border-t border-slate-100 bg-slate-50/60 -mx-6 -mb-6 mt-1 p-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 tracking-wide">Applicant Details</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                        <p>
                            <span className="font-medium text-slate-700">Name:</span>{" "}
                            {application.applicantId?.fullName || "N/A"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-700">Application ID:</span>{" "}
                            <span className="font-mono text-xs text-slate-500">{application._id}</span>
                        </p>
                        <p>
                            <span className="font-medium text-slate-700">Status:</span> {application.status}
                        </p>
                        <p>
                            <span className="font-medium text-slate-700">Expected salary:</span>{" "}
                            {application.expectedSalary != null ? application.expectedSalary.toLocaleString() : "N/A"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-700">Notice period:</span>{" "}
                            {application.noticePeriod != null ? `${application.noticePeriod} days` : "N/A"}
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 tracking-wide">Job Details</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                        <p>
                            <span className="font-medium text-slate-700">Position:</span> {application.jobId?.title}
                        </p>
                        <p>
                            <span className="font-medium text-slate-700">Resume:</span>{" "}
                            {application?.resumeId?.resumeUrl || "Not uploaded"}
                        </p>
                        <p>
                            <span className="font-medium text-slate-700">Applied:</span>{" "}
                            {new Date(application.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-2 tracking-wide">Cover Letter</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-white border border-slate-200 rounded-xl p-4">
                    {application.coverLetter || "No cover letter provided."}
                </p>
            </div>
        </div>
    )
}

export default ExpandedApplicationDetails
