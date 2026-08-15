import { useRef, useState, type DragEvent } from "react";
import {
    UploadCloud,
    FileText,
    Edit,
    Loader2,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import useApplicantStore from "../../store/useApplicantStore";

const MAX_SIZE_MB = 1;
const ACCEPTED_TYPES = [".pdf"];
const ACCEPTED_MIME = ["application/pdf"];

const ResumeUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const {
        getResumeLoader,
        resume,
        uploadResume,
        resumeUploadLoader,
    } = useApplicantStore();

    const validateAndUpload = (selected: File | null) => {
        if (!selected) return;

        const isValidType =
            ACCEPTED_MIME.includes(selected.type) ||
            ACCEPTED_TYPES.some((ext) =>
                selected.name.toLowerCase().endsWith(ext)
            );

        if (!isValidType) {
            setLocalError("Only PDF files are allowed.");
            return;
        }

        if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
            setLocalError(`File must be under ${MAX_SIZE_MB}MB.`);
            return;
        }

        setLocalError(null);
        uploadResume(selected);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        validateAndUpload(e.target.files?.[0] ?? null);
        e.target.value = "";
    };

    const handleDrop = (
        e: DragEvent<HTMLLabelElement>
    ) => {
        e.preventDefault();
        setIsDragging(false);
        validateAndUpload(e.dataTransfer.files?.[0] ?? null);
    };

    const displayError = localError;

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Header */}
                    <div className="bg-linear-to-r from-indigo-600 via-indigo-700 to-violet-700 px-6 py-5">
                        <h2 className="text-xl font-bold text-white">
                            Resume Upload
                        </h2>

                        <p className="text-indigo-100 text-sm mt-1">
                            Upload your latest resume in PDF format
                        </p>
                    </div>

                    <div className="p-5 sm:p-6">

                        {/* Skeleton */}
                        {getResumeLoader ? (
                            <div className="animate-pulse">

                                <div className="flex items-center gap-4 border rounded-2xl p-5">
                                    <div className="h-12 w-12 rounded-xl bg-slate-200" />

                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/3" />
                                        <div className="h-3 bg-slate-200 rounded w-20" />
                                    </div>
                                </div>

                            </div>
                        ) : resume ? (

                            /* Uploaded Resume */
                            <div
                                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                                    displayError
                                        ? "border-red-300 bg-red-50"
                                        : "border-green-200 bg-green-50"
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                    <div className="flex items-center gap-4 min-w-0">

                                        <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                            {resumeUploadLoader ? (
                                                <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                                            ) : (
                                                <FileText className="h-6 w-6 text-red-500" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-slate-800 truncate">
                                                {resume.fileName}
                                            </h3>

                                            <div className="flex items-center gap-2 mt-1">
                                                {resumeUploadLoader ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                                                        <span className="text-sm text-slate-500">
                                                            Uploading...
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                        <span className="text-sm text-green-700 font-medium">
                                                            Successfully Uploaded
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            inputRef.current?.click()
                                        }
                                        disabled={resumeUploadLoader}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition disabled:opacity-50"
                                    >
                                        <Edit className="h-4 w-4" />
                                        Replace Resume
                                    </button>
                                </div>
                            </div>

                        ) : (

                            /* Upload Area */
                            <label
                                htmlFor="resume-upload"
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDragging(true);
                                }}
                                onDragLeave={() =>
                                    setIsDragging(false)
                                }
                                onDrop={handleDrop}
                                className={`
                                    relative
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    border-2
                                    border-dashed
                                    p-8
                                    sm:p-12
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    ${
                                        displayError
                                            ? "border-red-300 bg-red-50"
                                            : isDragging
                                            ? "border-indigo-500 bg-indigo-50 scale-[1.01]"
                                            : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                                    }
                                `}
                            >
                                {resumeUploadLoader ? (
                                    <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
                                ) : (
                                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <UploadCloud className="h-10 w-10 text-indigo-600" />
                                    </div>
                                )}

                                <h3 className="mt-5 text-lg font-semibold text-slate-800 text-center">
                                    {resumeUploadLoader
                                        ? "Uploading Resume..."
                                        : "Upload Your Resume"}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500 text-center max-w-md">
                                    Drag & drop your resume here or click to
                                    browse from your device.
                                </p>

                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                                        PDF Only
                                    </span>

                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                                        Max {MAX_SIZE_MB}MB
                                    </span>
                                </div>
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
                            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />

                                <p className="text-sm text-red-600">
                                    {displayError}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeUpload;
