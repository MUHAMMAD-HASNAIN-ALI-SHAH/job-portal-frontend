import { useEffect, useRef, useState } from "react";
import {
    FileText,
    Loader2,
    AlertCircle,
    MoreVertical,
    Pencil,
    Trash2,
    View,
} from "lucide-react";
import useApplicantStore from "../../store/useApplicantStore";
import ResumePreview from "./ResumePreview";

const MAX_SIZE_MB = 1;
const ACCEPTED_TYPES = [".pdf"];
const ACCEPTED_MIME = ["application/pdf"];

const ResumeUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [resumePreviewOpen, setResumePreviewOpen] = useState(false);

    const {
        getResumeLoader,
        resume,
        uploadResume,
        resumeUploadLoader,
        deleteResume,
        deleteResumeLoader,
    } = useApplicantStore();

    // Close the menu when clicking anywhere outside of it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

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

    const displayError = localError;

    return (
        <div className="w-full mb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200">

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
                        ) : (

                            /* Uploaded Resume */
                            <div
                                className={`rounded-2xl border p-4 sm:p-5 transition-all ${displayError
                                    ? "border-red-300 bg-red-50"
                                    : "border-green-200 bg-green-50"
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-4">

                                    <div className="flex items-center gap-4 min-w-0">

                                        <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                            {resumeUploadLoader || deleteResumeLoader ? (
                                                <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                                            ) : (
                                                <FileText className="h-6 w-6 text-red-500" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 onClick={() => setResumePreviewOpen(true)} className="font-semibold truncate text-blue-500 hover:underline select-none cursor-pointer">
                                                {resume?.fileName}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {resume ? "Uploaded" : "No resume uploaded"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Menu (kebab) icon + dropdown */}
                                    <div className="relative shrink-0" ref={menuRef}>
                                        <button
                                            type="button"
                                            onClick={() => setMenuOpen((prev) => !prev)}
                                            disabled={resumeUploadLoader || deleteResumeLoader}
                                            className="cursor-pointer p-2 rounded-lg hover:bg-slate-200/60 transition disabled:opacity-50"
                                        >
                                            <MoreVertical className="h-5 w-5 text-slate-600" />
                                        </button>

                                        {menuOpen && (
                                            <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                                                {resume?.resumeUrl && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setMenuOpen(false);
                                                            window.open(resume?.resumeUrl, "_blank");
                                                        }}
                                                        className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                                    >
                                                        <View className="h-4 w-4" />
                                                        View Resume
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        inputRef.current?.click();
                                                    }}
                                                    className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    {resume?.resumeUrl ? "Update Resume" : "Upload Resume"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        deleteResume();
                                                    }}
                                                    className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete Resume
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

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
            {resumePreviewOpen && <ResumePreview onClose={() => setResumePreviewOpen(false)} resumeFile={resume?.resumeUrl || ""} />}
        </div>
    );
};

export default ResumeUpload;
