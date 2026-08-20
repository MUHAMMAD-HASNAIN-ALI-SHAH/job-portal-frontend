import { useState } from "react";
import { Loader2 } from "lucide-react";
import useApplicantStore from "../../store/useApplicantStore";
import ApplicantProfileForm from "./ApplicantProfileForm";

const ApplicantProfile = () => {
    const { applicant } = useApplicantStore();
    const [loading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-100 via-slate-50 to-white py-6">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="bg-linear-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl shadow-xl p-6 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                        {/* Avatar */}
                        <div className="h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold shrink-0">
                            {applicant?.fullName?.charAt(0)?.toUpperCase() || "N"}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                {applicant?.fullName || "Name not set"}
                            </h1>

                            <p className="text-indigo-100 mt-2">
                                {applicant?.headLine || "Headline not added"}
                            </p>

                            <p className="text-indigo-200 text-sm mt-2">
                                {applicant?.yearsOfExperience
                                    ? `${applicant.yearsOfExperience} years of experience`
                                    : "Experience not set"}
                            </p>

                            {/* Profile Completion Example */}
                            <div className="mt-4 max-w-sm">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Profile Status</span>
                                    <span>{Math.round(applicant?.profileCompleteness ?? 0)}%</span>
                                </div>

                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-2 bg-white rounded-full transition-all duration-300" style={{ width: `${applicant?.profileCompleteness ?? 0}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full md:w-auto bg-white text-indigo-700 hover:bg-slate-100 px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 p-5">
                        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                            Expected Salary
                        </p>

                        <p className="text-lg font-semibold text-slate-800">
                            {applicant?.expectedSalary
                                ? applicant.expectedSalary.toLocaleString()
                                : "N/A"}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 p-5">
                        <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                            Notice Period
                        </p>

                        <p className="text-lg font-semibold text-slate-800">
                            {applicant?.noticePeriod
                                ? `${applicant.noticePeriod} days`
                                : "N/A"}
                        </p>
                    </div>

                    {/* Preferred Job Types */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 p-5 md:col-span-2">
                        <h2 className="font-semibold text-slate-900 mb-4">
                            Preferred Job Types
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {applicant?.preferredJobTypes?.length ? (
                                applicant.preferredJobTypes.map((type) => (
                                    <span
                                        key={type}
                                        className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium"
                                    >
                                        {type}
                                    </span>
                                ))
                            ) : (
                                <p className="text-slate-500">N/A</p>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 p-5 md:col-span-2">
                        <h2 className="font-semibold text-slate-900 mb-4">
                            Skills
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {applicant?.skills?.length ? (
                                applicant.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium hover:scale-105 transition-transform"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-slate-500">N/A</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">
                        Education
                    </h2>

                    {applicant?.education?.length ? (
                        <div className="space-y-6">
                            {applicant.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="relative pl-8"
                                >
                                    <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-indigo-600" />

                                    <div className="absolute left-1.75 top-5 -bottom-6 w-0.5 bg-indigo-200" />

                                    <h3 className="font-semibold text-slate-800">
                                        {edu.degree}
                                    </h3>

                                    <p className="text-slate-600 text-sm mt-1">
                                        {edu.institution}
                                    </p>

                                    <p className="text-slate-400 text-xs mt-1">
                                        {edu.yearOfCompletion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500">No education added yet.</p>
                    )}
                </div>

                {/* Bio */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">
                        About Me
                    </h2>

                    <p className="text-slate-600 leading-7">
                        {applicant?.bio || "No bio available."}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isEditing && (
                <ApplicantProfileForm setIsEditing={setIsEditing} />
            )}
        </div>
    );
};

export default ApplicantProfile;