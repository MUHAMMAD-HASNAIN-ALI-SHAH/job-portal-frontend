import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useJobStore from "../store/useJobStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/jobs/JobCard";
import { JobCardSkeleton } from "../components/jobs/AllJobsItems";
import SearchBar from "../components/jobs/SearchBar";

const AllJobs = () => {
  const { jobs, getAllJobs, getJobsLoader } = useJobStore();
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All locations");

  const handleSearch = () => {
    getAllJobs(query, selectedCity);
  };

  useEffect(() => {
    if (jobs.length === 0) {
      getAllJobs(query, selectedCity);
    }
  }, [getAllJobs]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SearchBar
        query={query}
        setQuery={setQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        handleSearch={handleSearch}
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">All Jobs</h1>
          <p className="text-sm text-slate-500 mt-1">
            {getJobsLoader ? "Loading listings..." : `${jobs.length} open positions`}
          </p>
        </div>

        {!getJobsLoader && jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
            <Search className="h-8 w-8 mb-3" />
            <p className="text-sm">No jobs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {getJobsLoader
              ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
              : jobs.map((job) => <JobCard key={job._id} job={job} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllJobs;
