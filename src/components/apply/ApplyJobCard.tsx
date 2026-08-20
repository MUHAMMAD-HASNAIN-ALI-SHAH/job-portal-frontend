import { useEffect, useState, type FormEvent } from "react";
import type { ApplyFormErrors } from "./ApplyJobComponents";
import useApplicantStore from "../../store/useApplicantStore";
import { UploadCloud, FileText, X } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../lib/axios";
import readFileAsBase64 from "../../lib/base64";
import type { Job } from "../../interfaces";
import useAuthStore from "../../store/useAuthStore";


const ApplyJobCard = ({ onClose, setSubmitted, job }: { onClose: () => void; setSubmitted: (submitted: boolean) => void; job: Job }) => {
    const { isAuthenticated, user } = useAuthStore();
    const { applicant } = useApplicantStore();
    const [coverLetter, setCoverLetter] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");
    const [errors, setErrors] = useState<ApplyFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resume, setResume] = useState<{ resumeUrl: string; fileName: string } | null>(applicant?.resumeId ? {
        resumeUrl: applicant.resumeId.resumeUrl,
        fileName: applicant.resumeId.fileName
    } : null);

    useEffect(() => {
        if (applicant?.resumeId) {
            setResume({
                resumeUrl: applicant.resumeId.resumeUrl,
                fileName: applicant.resumeId.fileName,
            });
        }
    }, [applicant]);

    const clearError = (field: keyof ApplyFormErrors) => {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;

        if (selectedFile) {
            try {
                const base64Resume = await readFileAsBase64(selectedFile);
                setResume({ resumeUrl: base64Resume, fileName: selectedFile.name });
                setErrors((prev) => ({ ...prev, resume: undefined }));
            } catch (err) {
                console.error("Error reading resume file:", err);
                setErrors((prev) => ({ ...prev, resume: "Failed to read resume file." }));
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors((prev) => ({ ...prev, submitError: undefined }));

        setIsSubmitting(true);

        if (!isAuthenticated) {
            toast.error("You must be logged in to apply for this job.");
            setIsSubmitting(false);
            return;
        }

        if(!user || user.role !== "applicant") {
            toast.error("Only applicants can apply for jobs.");
            setIsSubmitting(false);
            return;
        }

        try {
            const payload: {
                jobId: string;
                coverLetter: string;
                expectedSalary: number;
                noticePeriod: number;
                resumeBase64: string | null;
                fileName: string | null;
            } = {
                jobId: job._id,
                coverLetter,
                expectedSalary: Number(expectedSalary),
                noticePeriod: Number(noticePeriod),
                resumeBase64: null,
                fileName: null,
            };
            if (resume?.resumeUrl?.startsWith("data:")) {
                payload.resumeBase64 = resume.resumeUrl;
                payload.fileName = resume.fileName;
            }

            await axiosInstance.post(`/api/v6/application`, payload);

            toast.success("Application submitted successfully");
            setSubmitted(true);
            onClose();
        } catch (err: any) {
            const message = err?.response?.data?.message || "Failed to submit application. Please try again.";
            toast.error(message);
            console.error("Application submission failed:", err?.response?.data || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 shrink-0">
                    <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-slate-900">Apply for this role</h2>
                        <p className="text-sm text-slate-500 truncate">{job?.title}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5 overflow-y-auto custom-scrollbar">

                    <div className="text-left">
                        <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Resume
                        </label>
                        <label
                            htmlFor="resume"
                            className={`flex items-center gap-3 w-full rounded-lg border-2 border-dashed px-4 py-3.5 text-sm cursor-pointer transition-colors ${resume
                                ? "border-indigo-200 bg-indigo-50/50"
                                : "border-slate-300 hover:border-indigo-300 hover:bg-slate-50"
                                } focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-500`}
                        >
                            {resume ? (
                                <FileText className="h-5 w-5 text-indigo-600 shrink-0" />
                            ) : (
                                <UploadCloud className="h-5 w-5 text-slate-400 shrink-0" />
                            )}
                            <span className={`truncate ${resume ? "text-slate-700 font-medium" : "text-slate-500"}`}>
                                {resume ? resume.fileName : "Click to upload your resume (PDF, DOC)"}
                            </span>
                        </label>
                        <input id="resume" type="file" accept=".pdf" onChange={handleResumeChange} className="hidden" />
                        {errors.resume && <p className="text-xs text-red-500 mt-1">{errors.resume}</p>}
                    </div>

                    <div className="text-left">
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Cover letter
                        </label>
                        <textarea
                            id="coverLetter"
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => {
                                setCoverLetter(e.target.value);
                                clearError("coverLetter");
                            }}
                            placeholder="Tell the company why you're a great fit for this role..."
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 resize-none"
                        />
                        <div className="flex justify-between mt-1">
                            <p className="text-xs text-slate-400 ml-auto">{coverLetter.length}/3000</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-left">
                            <label htmlFor="expectedSalary" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Expected salary (PKR)
                            </label>
                            <input
                                id="expectedSalary"
                                type="number"
                                min={0}
                                value={expectedSalary}
                                onChange={(e) => {
                                    setExpectedSalary(e.target.value);
                                    clearError("expectedSalary");
                                }}
                                placeholder="e.g. 150000"
                                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                        </div>

                        <div className="text-left">
                            <label htmlFor="noticePeriod" className="block text-sm font-medium text-slate-700 mb-1.5">
                                Notice period (days)
                            </label>
                            <input
                                id="noticePeriod"
                                type="number"
                                min={0}
                                value={noticePeriod}
                                onChange={(e) => {
                                    setNoticePeriod(e.target.value);
                                    clearError("noticePeriod");
                                }}
                                placeholder="e.g. 30"
                                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium rounded-lg py-3 text-sm shadow-sm transition-colors"
                    >
                        {isSubmitting && (
                            <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        )}
                        {isSubmitting ? "Submitting..." : "Submit application"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ApplyJobCard
