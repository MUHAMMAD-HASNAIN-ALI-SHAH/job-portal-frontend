import { X } from 'lucide-react';
import React, { useState } from 'react'
import axiosInstance from '../../lib/axios';
import { toast } from 'react-toastify';
import useApplicantStore from '../../store/useApplicantStore';
import type { Applicant, ApplicantEducation } from '../../interfaces';

const JOB_TYPE_OPTIONS = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const TagInput = ({
    values,
    onChange,
    placeholder,
}: {
    values: string[];
    onChange: (next: string[]) => void;
    placeholder: string;
}) => {
    const [draft, setDraft] = useState("");

    const addTag = () => {
        const value = draft.trim();
        if (!value || values.includes(value)) {
            setDraft("");
            return;
        }
        onChange([...values, value]);
        setDraft("");
    };

    const removeTag = (tag: string) => {
        onChange(values.filter((v) => v !== tag));
    };

    return (
        <div className="w-full rounded-md border border-gray-300 px-2 py-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-500">
            {values.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-indigo-400 hover:text-indigo-700 leading-none" aria-label={`Remove ${tag}`}>
                        &times;
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                    } else if (e.key === "Backspace" && !draft && values.length > 0) {
                        removeTag(values[values.length - 1]);
                    }
                }}
                onBlur={addTag}
                placeholder={values.length === 0 ? placeholder : "Add another..."}
                className="flex-1 min-w-30 text-sm outline-none px-1 py-0.5"
            />
        </div>
    );
};

const ApplicantProfileForm = ({ setIsEditing }: { setIsEditing: (isEditing: boolean) => void }) => {
    const [formData, setFormData] = useState<Applicant | null>(useApplicantStore.getState().applicant);
    const [isSaving, setIsSaving] = useState(false);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, type } = e.target;
        const name = e.target.name as keyof Applicant;
        setFormData((prev) =>
            prev
                ? ({ ...prev, [name]: type === "number" ? Number(value) : value } as Applicant)
                : prev
        );
    };

    const handleEducationChange = (index: number, field: keyof ApplicantEducation, value: string) => {
        setFormData((prev) => {
            if (!prev) return prev;
            const next = [...prev.education];
            next[index] = { ...next[index], [field]: field === "yearOfCompletion" ? Number(value) : value };
            return { ...prev, education: next };
        });
    };

    const addEducation = () => {
        setFormData((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                education: [...prev.education, { degree: "", institution: "", yearOfCompletion: new Date().getFullYear() }],
            };
        });
    };

    const removeEducation = (index: number) => {
        setFormData((prev) => {
            if (!prev) return prev;
            return { ...prev, education: prev.education.filter((_, i) => i !== index) };
        });
    };

    const handleSave = async () => {
        if (!formData) {
            toast.error("No form data to save.");
            return;
        }
        setIsSaving(true);
        try {
            const res = await axiosInstance.put("/api/v3/applicant", formData);
            useApplicantStore.getState().updateApplicantDetails(res.data);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again later.");
        }
        setIsSaving(false);
        setIsEditing(false);
    };
    return (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Edit profile</h2>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-slate-400 hover:text-slate-600"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-4">

                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center h-20 w-20 rounded-xl bg-indigo-50 text-indigo-700 text-2xl font-bold">
                            {formData?.fullName ? formData.fullName.charAt(0).toUpperCase() : "N/A"}
                        </div>
                    </div>

                    <div className="text-left">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            value={formData?.fullName || ""}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="headLine" className="block text-sm font-medium text-gray-700 mb-1">
                            Headline
                        </label>
                        <input
                            id="headLine"
                            name="headLine"
                            value={formData?.headLine || ""}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            value={formData?.bio || ""}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                        />
                        <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400 ml-auto">{formData?.bio?.length || 0}/5000</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-left">
                            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                                Years of experience
                            </label>
                            <input
                                id="yearsOfExperience"
                                name="yearsOfExperience"
                                type="number"
                                min={0}
                                value={formData?.yearsOfExperience || 0}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                        </div>

                        <div className="text-left">
                            <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">
                                Notice period (days)
                            </label>
                            <input
                                id="noticePeriod"
                                name="noticePeriod"
                                type="number"
                                min={0}
                                value={formData?.noticePeriod || 0}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="text-left">
                        <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">
                            Expected salary
                        </label>
                        <input
                            id="expectedSalary"
                            name="expectedSalary"
                            type="number"
                            min={0}
                            value={formData?.expectedSalary || 0}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                        <TagInput
                            values={formData?.skills ?? []}
                            onChange={(next) => setFormData((prev) => (prev ? { ...prev, skills: next } : prev))}
                            placeholder="e.g. React, TypeScript, Node.js"
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred job types</label>
                        <div className="flex flex-wrap gap-2">
                            {JOB_TYPE_OPTIONS.map((type) => {
                                const selected = (formData?.preferredJobTypes ?? []).includes(type);
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => {
                                                if (!prev) return prev;
                                                const currentTypes = prev.preferredJobTypes ?? [];
                                                return {
                                                    ...prev,
                                                    preferredJobTypes: selected
                                                        ? currentTypes.filter((t) => t !== type)
                                                        : [...currentTypes, type],
                                                };
                                            })
                                        }
                                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${selected
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-left">
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-700">Education</label>
                            <button
                                type="button"
                                onClick={addEducation}
                                className="text-xs font-medium text-indigo-600 hover:underline"
                            >
                                + Add
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(formData?.education ?? []).map((edu, index) => (
                                <div key={index} className="border border-gray-200 rounded-md p-3 space-y-2 relative">
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xs"
                                        aria-label="Remove education"
                                    >
                                        &times;
                                    </button>
                                    <input
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                    />
                                    <input
                                        placeholder="Institution"
                                        value={edu.institution}
                                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Year of completion"
                                        value={edu.yearOfCompletion}
                                        onChange={(e) => handleEducationChange(index, "yearOfCompletion", e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                                    />
                                </div>
                            ))}
                            {(formData?.education ?? []).length === 0 && (
                                <p className="text-xs text-gray-400">No education added yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium py-2.5 rounded-md transition-colors"
                        >
                            {isSaving && (
                                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            )}
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicantProfileForm
