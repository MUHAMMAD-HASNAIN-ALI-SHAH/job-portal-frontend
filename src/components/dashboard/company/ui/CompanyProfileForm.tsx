import { useState, type FormEvent } from "react";
import type { CompanyInterface } from "../../../../interfaces";
import axiosInstance from "../../../../lib/axios";
import { toast } from "react-toastify";
import useCompanyStore from "../../../../store/useCompanyStore";
import useNavigationStore from "../../../../store/useNavigationStore";

const INDUSTRY_OPTIONS = ["IT", "Finance", "Healthcare", "Education", "Marketing", "Sales", "Other"];
const SIZE_OPTIONS = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10000+"];

const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read logo file."));
        reader.readAsDataURL(file);
    });
};

const CompanyProfileForm = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const { updateCompanyDetails } = useCompanyStore();
    const { company } = useCompanyStore();
    const [formData, setFormData] = useState<CompanyInterface>(
        company || {
            logo: "",
            name: "",
            email: "",
            industry: "",
            size: "",
            location: "",
            website: "",
            about: "",
        }
    );
    const { setEditCompanyProfile } = useNavigationStore();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setLogoFile(file);
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const logo = logoFile ? await readFileAsBase64(logoFile) : formData.logo;

            const data = {
                name: formData.name,
                industry: formData.industry,
                size: formData.size,
                location: formData.location,
                website: formData.website,
                logo: logo,
                about: formData.about,
            };

            const response = await axiosInstance.put("/api/v2/company", data);
            updateCompanyDetails(response.data);
            setEditCompanyProfile(false);
            toast.success("Company profile updated successfully.");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update company profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div
            className="bg-white border border-slate-100 rounded-xl shadow-sm px-6 py-5 space-y-4 relative"
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-900">Edit company profile</h2>
                    <button
                        onClick={() => setEditCompanyProfile(false)}
                        className="text-slate-400 hover:text-slate-600 text-xl leading-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSave} noValidate className="px-6 py-5 space-y-4">

                    {logoFile ? (
                        <div className="flex items-center justify-center">
                            <img
                                src={URL.createObjectURL(logoFile)}
                                alt="Company Logo Preview"
                                className="h-20 w-20 rounded-xl object-cover"
                            />
                        </div>
                    ) : formData.logo ? (
                        <div className="flex items-center justify-center">
                            <img
                                src={formData.logo}
                                alt="Company Logo"
                                className="h-20 w-20 rounded-xl object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-20 w-20 rounded-xl bg-indigo-50 text-indigo-700 text-2xl font-bold">
                            {formData.name ? formData.name.charAt(0).toUpperCase() : "N/A"}
                        </div>
                    )}

                    <div className="text-left">
                        <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Logo
                        </label>
                        <input
                            id="logo"
                            name="logo"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                        {logoFile && (
                            <p className="text-xs text-gray-500 mt-1">Selected: {logoFile.name}</p>
                        )}
                    </div>

                    <div className="text-left">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Company name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none cursor-not-allowed"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                        </label>
                        <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                        >
                            <option value="">Select industry</option>
                            {INDUSTRY_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-left">
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                            Company size
                        </label>
                        <select
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                        >
                            <option value="">Select company size</option>
                            {SIZE_OPTIONS.map((option) => (
                                <option key={option} value={option}>{option} employees</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-left">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                        </label>
                        <input
                            id="website"
                            name="website"
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                            About
                        </label>
                        <textarea
                            id="about"
                            name="about"
                            rows={4}
                            value={formData.about}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                        />
                        <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-400 ml-auto">{formData.about?.length ?? 0}/5000</p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setEditCompanyProfile(false)}
                            className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium py-2.5 rounded-md transition-colors"
                        >
                            {isSaving && (
                                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            )}
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanyProfileForm