import { useState, type FormEvent, type KeyboardEvent } from "react";
import { toast } from "react-toastify";
import type { EmploymentType, ExperienceLevel, JobForm } from "../../../interfaces";
import useCompanyNavigationStore from "../../../store/useCompanyNavigationStore";
import axiosInstance from "../../../lib/axios";
import useCompanyStore from "../../../store/useCompanyStore";

const EXPERIENCE_OPTIONS: ExperienceLevel[] = ["Internship", "Entry", "Mid", "Senior", "Lead"];
const EMPLOYMENT_OPTIONS: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Freelance", "Temporary"];

const INITIAL_FORM: JobForm = {
  title: "",
  description: "",
  requirements: [],
  skills: [],
  experienceLevel: "Entry",
  location: "",
  salary: "",
  employmentType: "Full-time",
  applicationDeadline: "",
  status: "active",
};

const TagInput = ({
  label,
  placeholder,
  values,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (next: string[]) => void;
  error?: string;
}) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const value = draft.trim();
    if (!value) return;
    if (values.includes(value)) {
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
    <div className="text-left">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`w-full rounded-md border px-2 py-2 flex flex-wrap gap-2 focus-within:ring-2 transition-colors ${error
          ? "border-red-400 focus-within:ring-red-200"
          : "border-gray-300 focus-within:ring-indigo-200 focus-within:border-indigo-500"
          }`}
      >
        {values.map((tag) => (
          <span key={tag} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
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
      <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add</p>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const CompanyAddJob = () => {
  const [formData, setFormData] = useState<JobForm>(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const { setSidebarMenu } = useCompanyNavigationStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      const payload = {
        ...formData,
      };

      console.log("Submitting job:", payload);

      const res = await axiosInstance.post("/api/v4/job", payload);

      toast.success("Job posted successfully");

      setFormData(INITIAL_FORM);

      useCompanyStore.getState().addJob(res.data);

      setSidebarMenu("my-jobs");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to post job"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="mx-auto">
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Post a new job</h1>
            <p className="text-sm text-gray-500">
              Fill in the details below to publish a listing on JobStack.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Title */}
            <div className="text-left">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-400 ml-auto">{formData.title.length}/100</p>
              </div>
            </div>

            {/* Description */}
            <div className="text-left">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and what a good day looks like..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-400 ml-auto">{formData.description.length}/5000</p>
              </div>
            </div>

            {/* Requirements */}
            <TagInput
              label="Requirements"
              placeholder="e.g. 3+ years of React experience"
              values={formData.requirements}
              onChange={(next) => {
                setFormData((prev) => ({ ...prev, requirements: next }));
              }}
            />

            {/* Skills */}
            <TagInput
              label="Skills"
              placeholder="e.g. React, TypeScript, Node.js"
              values={formData.skills}
              onChange={(next) => {
                setFormData((prev) => ({ ...prev, skills: next }));
              }}
            />

            {/* Experience level + Employment type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-left">
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="text-left">
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment type
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
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
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Karachi, Pakistan or Remote"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>

              <div className="text-left">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. PKR 150,000 - 200,000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Application deadline */}
            <div className="text-left">
              <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                Application deadline <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="applicationDeadline"
                name="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>

            {/* Publish toggle */}
            <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-md px-4 py-3">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">Publish immediately</p>
                <p className="text-xs text-gray-400">
                  Turn this off to save as a draft instead.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formData.status === "active"}
                onClick={() => setFormData((prev) => ({ ...prev, status: prev.status === "active" ? "draft" : "active" }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${formData.status === "active" ? "bg-indigo-600" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.status === "active" ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-md py-2.5 text-sm transition-colors mt-2"
            >
              {isSaving && (
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {isSaving ? "Posting..." : formData.status === "active" ? "Post job" : "Save as draft"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyAddJob
