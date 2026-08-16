import { X } from "lucide-react";

const ResumePreview = ({ onClose, resumeFile }: { onClose: () => void; resumeFile: string }) => {
    const isDataUrl = resumeFile.startsWith("data:");
    const src = isDataUrl
        ? resumeFile
        : `${resumeFile}#toolbar=0&navpanes=0&scrollbar=0`;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-[90vh] flex flex-col overflow-auto custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-2 border-b border-slate-200 shrink-0">
                    <h1 className="text-lg font-semibold text-slate-700">
                        Resume Preview
                    </h1>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <iframe
                    src={src}
                    title="Resume preview"
                    className="w-full flex-1 border-0 bg-white"
                />
            </div>
        </div>
    );
};

export default ResumePreview;