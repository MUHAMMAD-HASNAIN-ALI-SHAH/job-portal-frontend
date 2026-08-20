import { useState } from "react"
import { X } from "lucide-react"
import type { Job } from "../../../../interfaces"
import useCompanyNavigationStore from "../../../../store/useCompanyNavigationStore"
import JobApplicationsCard from "./JobApplicationsCard"
import useCompanyStore from "../../../../store/useCompanyStore"

const TABS = ["applied", "shortlisted", "rejected", "hired"] as const

const jobStatusStyles: Record<string, string> = {
    active: "bg-green-500",
    draft: "bg-amber-400",
    closed: "bg-slate-300",
}

const jobStatusText: Record<string, string> = {
    active: "text-green-700",
    draft: "text-amber-700",
    closed: "text-slate-500",
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

const JobApplications = ({ job }: { job: Job }) => {
    const { setApplicationJobId } = useCompanyNavigationStore()
    const { applications: allApplications } = useCompanyStore()
    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("applied")

    const jobApplications = allApplications.filter(
        (app) => app.jobId._id === job._id
    )
    const filteredApplications = jobApplications.filter(
        (app) => app.status === activeTab
    )

    return (
        <div className="relative w-full border border-slate-200 rounded-xl bg-white shadow-sm px-5 py-4">
            {/* Close button */}
            <button
                onClick={() => setApplicationJobId(null)}
                aria-label="Close"
                className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
                <X className="h-5 w-5" />
            </button>

            {/* Top: title + status */}
            <div className="pr-6">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-base text-slate-900 leading-snug">
                        {job.title}
                    </h3>
                    <span className="flex items-center gap-1.5 shrink-0 mt-0.5">
                        <span
                            className={`h-2 w-2 rounded-full ${jobStatusStyles[job.status] ?? "bg-slate-300"}`}
                        />
                        <span
                            className={`text-[11px] font-medium capitalize ${jobStatusText[job.status] ?? "text-slate-500"}`}
                        >
                            {job.status}
                        </span>
                    </span>
                </div>

                <p className="text-xs text-slate-500 mt-1">{job.location}</p>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3">
                    <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {job.experienceLevel}
                    </span>
                    <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {job.employmentType}
                    </span>
                    <span className="text-[11px] font-medium text-green-700">
                        {job.salary}
                    </span>
                </div>
            </div>

            {/* Bottom: meta */}
            <div className="flex items-end justify-between mt-4 pt-3 border-t border-slate-100">
                <div>
                    <p className="text-[11px] text-slate-400">
                        posted {formatDate(job.postedAt)}
                    </p>
                    <p className="text-xs font-medium text-slate-700 mt-0.5">
                        {job.applicantsCount ?? 0} applicants
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex w-full items-center gap-1 mt-4 border-b border-slate-200">
                {TABS.map((tab) => {
                    const count = jobApplications.filter(
                        (app) => app.status === tab
                    ).length
                    const isActive = activeTab === tab

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-3 py-2.5 text-sm font-medium transition-colors ${
                                isActive
                                    ? "text-slate-900"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            <span
                                className={`ml-1.5 text-xs ${
                                    isActive ? "text-slate-500" : "text-slate-400"
                                }`}
                            >
                                ({count})
                            </span>
                            {isActive && (
                                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-slate-900 rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Applications list */}
            <div className="mt-3">
                {filteredApplications.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {filteredApplications.map((application) => (
                            <JobApplicationsCard
                                key={application._id}
                                application={application}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-400 text-center py-8">
                        No {activeTab} applications yet.
                    </p>
                )}
            </div>
        </div>
    )
}

export default JobApplications
