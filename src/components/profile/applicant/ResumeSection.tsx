import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApplicantStore from "../../../store/useApplicantStore";

const ResumeSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { uploadResume, uploadResumeLoader, resume, getResumeLoader } =
    useApplicantStore();

  const [menuOpen, setMenuOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    setMenuOpen(false);
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error("Max file size is 500KB");
      return;
    }

    try {
      const base64File = await fileToBase64(file);
      uploadResume(base64File, file.name);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload resume");
    }
  };

  return (
    <section className="relative flex flex-col gap-3 mt-6 sm:mt-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">Resume</h1>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            disabled={uploadResumeLoader || getResumeLoader}
            className="text-2xl px-2 py-1 rounded-full cursor-pointer hover:bg-gray-300 disabled:opacity-50"
          >
            <i className="ri-more-2-fill"></i>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md z-10">
              <button
                onClick={handleButtonClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Upload / Replace
              </button>

              <button
                disabled
                className="w-full text-left px-4 py-2 text-gray-400 cursor-not-allowed"
              >
                Remove (soon)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== LOADER WHILE FETCHING RESUME ===== */}
      {getResumeLoader || uploadResumeLoader ? (
        <div className="flex items-center gap-4 mt-4">
          <div className="w-16 h-16 bg-gray-400 animate-pulse rounded" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-gray-400 animate-pulse rounded w-2/3" />
            <div className="h-3 bg-gray-400 animate-pulse rounded w-1/3" />
          </div>
        </div>
      ) : resume ? (
        /* ===== RESUME EXISTS ===== */
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <img
            src="/resume-pdf-icon.png"
            alt="resume"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />

          <div className="flex flex-col justify-evenly">
            <a
              href={resume.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-semibold text-blue-600 hover:underline truncate max-w-55 sm:max-w-full"
            >
              {resume.fileName}
            </a>

            <h4 className="text-sm sm:text-md text-gray-500">
              Uploaded on {new Date(resume.uploadedAt).toLocaleDateString()}
            </h4>
          </div>
        </div>
      ) : (
        /* ===== NO RESUME STATE ===== */
        <div className="flex flex-col gap-2 text-gray-500 mt-4">
          <button onClick={handleButtonClick} className="text-blue-600 hover:underline cursor-pointer">
            Upload Resume
          </button>
          <p>No resume uploaded yet.</p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      <p className="text-sm text-gray-500 mt-2">
        Supported formats: PDF. Max file size: 500KB.
      </p>
    </section>
  );
};

export default ResumeSection;
