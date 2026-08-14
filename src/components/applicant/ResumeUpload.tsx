import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, FileText, Edit, Loader2, AlertCircle } from "lucide-react";
import useApplicantStore from "../../store/useApplicantStore";

const MAX_SIZE_MB = 1;
const ACCEPTED_TYPES = [".pdf"];
const ACCEPTED_MIME = ["application/pdf"];

const ResumeUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const { getResumeLoader, resume, uploadResume, resumeUploadLoader } = useApplicantStore();

    const validateAndUpload = (selected: File | null) => {
        if (!selected) return;

        const isValidType =
            ACCEPTED_MIME.includes(selected.type) ||
            ACCEPTED_TYPES.some((ext) => selected.name.toLowerCase().endsWith(ext));

        if (!isValidType) {
            setLocalError("Only PDF files are allowed.");
            return;
        }

        if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
            setLocalError(`File must be under ${MAX_SIZE_MB}MB.`);
            return;
        }

        console.log(resume ? "Replacing resume with new file:" : "Resume selected:", selected.name);

        setLocalError(null);
        uploadResume(selected);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateAndUpload(e.target.files?.[0] ?? null);
        e.target.value = "";
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        validateAndUpload(e.dataTransfer.files?.[0] ?? null);
    };

    const displayError = localError;

    return (
        <div className="w-full">
            <div className="w-full px-8 max-w-5xl mx-auto mb-10">
                <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>

                    {getResumeLoader ? (
                        <div className="flex items-center gap-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 animate-pulse">
                            <div className="h-9 w-9 rounded-md bg-slate-200 shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-3.5 w-1/3 bg-slate-200 rounded" />
                                <div className="h-3 w-16 bg-slate-200 rounded" />
                            </div>
                        </div>
                    ) : resume ? (
                        <div
                            className={`flex items-center justify-between gap-3 w-full rounded-lg border px-4 py-3 ${displayError ? "border-red-300 bg-red-50/40" : "border-slate-200 bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="h-9 w-9 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    {resumeUploadLoader ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <FileText className="h-4 w-4" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{resume.fileName}</p>
                                    <p className="text-xs text-slate-400">
                                        {resumeUploadLoader ? "Uploading..." : "Uploaded"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    disabled={resumeUploadLoader}
                                    className="text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-50"
                                    aria-label="Replace resume"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <label
                            htmlFor="resume-upload"
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed px-4 py-8 text-sm cursor-pointer transition-colors ${displayError
                                ? "border-red-300 bg-red-50/40"
                                : isDragging
                                    ? "border-indigo-400 bg-indigo-50/50"
                                    : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                                }`}
                        >
                            {resumeUploadLoader ? (
                                <Loader2 className="h-6 w-6 text-indigo-500 animate-spin" />
                            ) : (
                                <UploadCloud className="h-6 w-6 text-slate-400" />
                            )}
                            <span className="text-slate-600 text-center">
                                {resumeUploadLoader ? (
                                    "Uploading..."
                                ) : (
                                    <>
                                        <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
                                    </>
                                )}
                            </span>
                            <span className="text-xs text-slate-400">PDF only (max {MAX_SIZE_MB}MB)</span>
                        </label>
                    )}

                    <input
                        id="resume-upload"
                        ref={inputRef}
                        type="file"
                        accept={ACCEPTED_TYPES.join(",")}
                        onChange={handleInputChange}
                        className="hidden"
                    />

                    {displayError && (
                        <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                            <AlertCircle className="h-3.5 w-3.5" /> {displayError}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeUpload;
