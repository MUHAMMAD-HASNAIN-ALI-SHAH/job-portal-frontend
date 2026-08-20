import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import useCompanyStore from "../../../../store/useCompanyStore";
import useCompanyNavigationStore from "../../../../store/useCompanyNavigationStore";
import type { EmploymentType, ExperienceLevel } from "../../../../interfaces";
import axiosInstance from "../../../../lib/axios";
import { toast } from "react-toastify";

const EXPERIENCE_OPTIONS: ExperienceLevel[] = ["Internship", "Entry", "Mid", "Senior", "Lead"];
const EMPLOYMENT_OPTIONS: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Freelance", "Temporary"];

const TagInput = ({
    values,
    onChange,
    placeholder,
    error,
}: {
    values: string[];
    onChange: (next: string[]) => void;
    placeholder: string;
    error?: string;
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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        } else if (e.key === "Backspace" && !draft && values.length > 0) {
            removeTag(values[values.length - 1]);
        }
    };

    return (
        <div
            className={`w-full rounded-md border px-2 py-2 flex flex-wrap gap-2 focus-within:ring-2 transition-colors ${error
                ? "border-red-400 focus-within:ring-red-200"
                : "border-gray-300 focus-within:ring-indigo-200 focus-within:border-indigo-500"
                }`}
        >
            {values.map((tag) => (
                <span
                    key={tag}
                    className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-indigo-400 hover:text-indigo-700 leading-none"
                        aria-label={`Remove ${tag}`}
                    >
                        &times;
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                placeholder={values.length === 0 ? placeholder : "Add another..."}
                className="flex-1 min-w-30 text-sm outline-none px-1 py-0.5"
            />
        </div>
    );
};

const EditJob = () => {
    const { jobs } = useCompanyStore();
    const { setEditJobId, editJobId } = useCompanyNavigationStore();
    const job = jobs.find((job) => job._id === editJobId);
    const { updateJob } = useCompanyStore();

    const [formData, setFormData] = useState(job);
    const [isSaving, setIsSaving] = useState(false);

    if (!job) {
        return (
            <div className="text-sm text-gray-500 px-4 py-3">Job not found.</div>
        );
    }

    if (!formData) {
        setFormData(job);
    }

    const data = formData ?? job;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axiosInstance.put(`/api/v4/job/${job._id}`, data)
                .then((response) => {
                    setEditJobId(null);
                    updateJob(job._id, response.data);
                })
        } catch (error: any) {
            console.error("Error updating job:", error);
            toast.error(error?.response?.data?.message || "Failed to save changes. Please try again.");
        }
        setIsSaving(false);
    };

    return (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm px-6 py-5 space-y-4 relative">
            {/* Close button */}
            <button
                type="button"
                onClick={() => setEditJobId(null)}
                className="absolute cursor-pointer top-4 right-4 text-black transition-colors"
                aria-label="Close"
            >
                <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 pr-8">Edit job</h2>

            {/* Title */}
            <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
                <input
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
                <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400 ml-auto">{data.title.length}/100</p>
                </div>
            </div>

            {/* Description */}
            <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    rows={4}
                    value={data.description}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
                <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400 ml-auto">{data.description.length}/5000</p>
                </div>
            </div>

            {/* Requirements */}
            <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <TagInput
                    values={data.requirements}
                    onChange={(next) => {
                        setFormData((prev) => (prev ? { ...prev, requirements: next } : prev));
                    }}
                    placeholder="e.g. 3+ years of React experience"
                />
            </div>

            {/* Skills */}
            <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <TagInput
                    values={data.skills}
                    onChange={(next) => {
                        setFormData((prev) => (prev ? { ...prev, skills: next } : prev));
                    }}
                    placeholder="e.g. React, TypeScript, Node.js"
                />
            </div>

            {/* Experience level + Employment type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience level</label>
                    <select
                        name="experienceLevel"
                        value={data.experienceLevel}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                        {EXPERIENCE_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment type</label>
                    <select
                        name="employmentType"
                        value={data.employmentType}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                        {EMPLOYMENT_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Location + Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        name="location"
                        value={data.location}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                </div>

                <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                    <input
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Application deadline */}
            <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Application deadline</label>
                <input
                    type="date"
                    name="applicationDeadline"
                    value={
                        data.applicationDeadline
                            ? data.applicationDeadline.split("T")[0]
                            : ""
                    }
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
            </div>

            {/* Status */}
            <div className="text-left">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="text-xs font-medium px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400"
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default EditJob;