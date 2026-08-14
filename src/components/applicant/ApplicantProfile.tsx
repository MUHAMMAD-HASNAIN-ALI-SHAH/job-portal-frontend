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
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="animate-spin h-6 w-6 text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 relative">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header card */}
                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="h-20 w-20 rounded-xl bg-indigo-50 text-indigo-700 text-2xl font-bold flex items-center justify-center shrink-0">
                        {applicant?.fullName?.charAt(0) || "N/A"}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-slate-900">{applicant?.fullName || "Name not set"}</h1>
                        <p className="text-slate-500 text-sm mt-1">{applicant?.headLine || "Headline"}</p>
                        <p className="text-slate-400 text-sm mt-1">
                            {applicant?.yearsOfExperience ? `${applicant.yearsOfExperience} years of experience` : "Experience not set"}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setIsEditing(true);
                        }}
                        className="self-start sm:self-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                    >
                        Edit profile
                    </button>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5">
                        <p className="text-xs text-slate-400 mb-1">Expected salary</p>
                        <p className="text-slate-800 text-sm font-medium">
                            {applicant?.expectedSalary ? applicant.expectedSalary.toLocaleString() : "N/A"}
                        </p>
                    </div>

                    <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5">
                        <p className="text-xs text-slate-400 mb-1">Notice period</p>
                        <p className="text-slate-800 text-sm font-medium">
                            {applicant?.noticePeriod ? `${applicant.noticePeriod} days` : "N/A"}
                        </p>
                    </div>

                    <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5 sm:col-span-2">
                        <p className="text-xs text-slate-400 mb-2">Preferred job types</p>
                        <div className="flex flex-wrap gap-2">
                            {applicant?.preferredJobTypes && applicant.preferredJobTypes.length ? (
                                applicant.preferredJobTypes.map((type) => (
                                    <span key={type} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {type}
                                    </span>
                                ))
                            ) : (
                                <p className="text-slate-800 text-sm font-medium">N/A</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5 sm:col-span-2">
                        <p className="text-xs text-slate-400 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {applicant?.skills && applicant.skills.length ? (
                                applicant.skills.map((skill) => (
                                    <span key={skill} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-slate-800 text-sm font-medium">N/A</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 mt-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-4">Education</h2>
                    {applicant?.education && applicant.education.length ? (
                        <div className="space-y-4">
                            {applicant.education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-indigo-600 pl-4">
                                    <p className="text-slate-800 text-sm font-medium">{edu.degree}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{edu.institution}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{edu.yearOfCompletion}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-600 text-sm">N/A</p>
                    )}
                </div>

                {/* Bio */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 mt-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-2">Bio</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">{applicant?.bio || "N/A"}</p>
                </div>
            </div>

            {/* Edit modal */}
            {isEditing && (
                <ApplicantProfileForm setIsEditing={setIsEditing} />
            )}
        </div>
    );
};

export default ApplicantProfile;