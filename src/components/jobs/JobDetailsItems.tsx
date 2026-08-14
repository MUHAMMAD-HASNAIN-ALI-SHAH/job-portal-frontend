import { useNavigate } from "react-router-dom";
import type { Job } from "../../interfaces";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

export const JobDetailsSkeleton = () => (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-pulse">
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                        <div className="h-8 w-2/3 bg-slate-200 rounded" />
                        <div className="flex flex-wrap gap-3 mt-4">
                            <div className="h-6 w-24 bg-slate-200 rounded-full" />
                            <div className="h-6 w-24 bg-slate-200 rounded-full" />
                            <div className="h-6 w-28 bg-slate-200 rounded-full" />
                        </div>
                    </div>
                    <div className="h-11 w-32 bg-slate-200 rounded-lg shrink-0" />
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
                <section>
                    <div className="h-5 w-40 bg-slate-200 rounded mb-3" />
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-200 rounded" />
                        <div className="h-3 w-5/6 bg-slate-200 rounded" />
                        <div className="h-3 w-2/3 bg-slate-200 rounded" />
                    </div>
                </section>

                <section>
                    <div className="h-5 w-32 bg-slate-200 rounded mb-3" />
                    <div className="space-y-2">
                        <div className="h-3 w-4/5 bg-slate-200 rounded" />
                        <div className="h-3 w-3/5 bg-slate-200 rounded" />
                        <div className="h-3 w-2/5 bg-slate-200 rounded" />
                    </div>
                </section>

                <section>
                    <div className="h-5 w-36 bg-slate-200 rounded mb-3" />
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-16 bg-slate-200 rounded-full" />
                        <div className="h-6 w-20 bg-slate-200 rounded-full" />
                        <div className="h-6 w-14 bg-slate-200 rounded-full" />
                        <div className="h-6 w-24 bg-slate-200 rounded-full" />
                    </div>
                </section>

                <section>
                    <div className="h-5 w-28 bg-slate-200 rounded mb-4" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="border rounded-xl p-4 space-y-2">
                                <div className="h-3 w-20 bg-slate-200 rounded" />
                                <div className="h-4 w-24 bg-slate-200 rounded" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="pt-4">
                    <div className="h-12 w-full bg-slate-200 rounded-lg" />
                </div>
            </div>
        </div>
    </div>
);

export const JobDetailsCard = ({ job }: { job: Job }) => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuthStore();

    const handleApply = () => {
        if (!job) return;
        if(!isAuthenticated) {
            toast.error("Please login to apply for this job.");
            return;
        }
        navigate(`/job/${job._id}/apply`);
    };

    return (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {job.title}
                        </h1>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                                {job.experienceLevel}
                            </span>

                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                {job.employmentType}
                            </span>

                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                                {job.location}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleApply}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
                {/* Description */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        Job Description
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        {job.description}
                    </p>
                </section>

                {/* Requirements */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        Requirements
                    </h2>

                    <ul className="space-y-2">
                        {job.requirements.map((requirement, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-gray-600"
                            >
                                <span>•</span>
                                <span>{requirement}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Skills */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        Skills Required
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Details */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">
                        Job Details
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-500">
                                Employment Type
                            </p>
                            <p className="font-semibold mt-1">
                                {job.employmentType}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-500">
                                Experience
                            </p>
                            <p className="font-semibold mt-1">
                                {job.experienceLevel}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-500">
                                Salary
                            </p>
                            <p className="font-semibold mt-1">
                                {job.salary || "Not specified"}
                            </p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-sm text-gray-500">
                                Location
                            </p>
                            <p className="font-semibold mt-1">
                                {job.location}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Deadline */}
                {job.applicationDeadline && (
                    <section>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <p className="font-medium text-yellow-800">
                                Application Deadline
                            </p>

                            <p className="text-yellow-700 mt-1">
                                {new Date(
                                    job.applicationDeadline
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </section>
                )}

                {/* Apply Button Bottom */}
                <div className="pt-4">
                    <button
                        onClick={handleApply}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
                    >
                        Apply For This Job
                    </button>
                </div>
            </div>
        </div>
    )
}