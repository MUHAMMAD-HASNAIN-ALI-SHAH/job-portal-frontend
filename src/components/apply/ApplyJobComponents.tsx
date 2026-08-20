import { SearchX } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export interface ApplyFormErrors {
  coverLetter?: string;
  resume?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  submitError?: string;
}

export const JobApplyError = ({ error }: { error: string | null }) => (
  <>
    <Navbar />
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="bg-white rounded-2xl border shadow-sm p-12 text-center flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <SearchX className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {error ? "Something went wrong" : "Job not found"}
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-sm">
          {error || "This job listing may have been removed or the link is incorrect."}
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Go back
        </button>
      </div>
    </div>
    <Footer />
  </>
);