import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Briefcase,
    ArrowUpDown,
    X,
    Filter,
    TrendingUp,
} from "lucide-react";

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

    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

    const [experienceFilter, setExperienceFilter] =
        useState("All");

    const [employmentFilter, setEmploymentFilter] =
        useState("All");

    const handleSearch = () => {
        getAllJobs(query, selectedCity);
    };

    useEffect(() => {
        if (jobs.length === 0) {
            getAllJobs(query, selectedCity);
        }
    }, [getAllJobs]);

    const filteredJobs = useMemo(() => {
        let filtered = [...jobs];

        if (experienceFilter !== "All") {
            filtered = filtered.filter(
                (job: any) =>
                    job.experienceLevel === experienceFilter
            );
        }

        if (employmentFilter !== "All") {
            filtered = filtered.filter(
                (job: any) =>
                    job.employmentType === employmentFilter
            );
        }

        filtered.sort((a: any, b: any) => {
            const diff =
                new Date(b.postedAt).getTime() -
                new Date(a.postedAt).getTime();

            return sortBy === "newest" ? diff : -diff;
        });

        return filtered;
    }, [
        jobs,
        sortBy,
        experienceFilter,
        employmentFilter,
    ]);

    const activeFiltersCount =
        (experienceFilter !== "All" ? 1 : 0) +
        (employmentFilter !== "All" ? 1 : 0);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden bg-linear-to-r from-indigo-700 via-indigo-600 to-violet-700">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-white text-xs font-medium mb-5">
                            <Briefcase className="h-3.5 w-3.5" />
                            Discover Opportunities
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Find Your Dream Job
                        </h1>

                        <p className="mt-4 text-indigo-100 text-base md:text-lg max-w-2xl">
                            Explore verified opportunities from
                            companies actively hiring talented
                            professionals.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mt-8 max-w-xl">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                                <p className="text-white text-2xl font-bold">
                                    {jobs.length}
                                </p>
                                <p className="text-indigo-100 text-xs">
                                    Open Jobs
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                                <p className="text-white text-2xl font-bold">
                                    100+
                                </p>
                                <p className="text-indigo-100 text-xs">
                                    Companies
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                                <p className="text-white text-2xl font-bold">
                                    Daily
                                </p>
                                <p className="text-indigo-100 text-xs">
                                    Updates
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEARCH */}
            <div className="sticky top-20 z-20">
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    handleSearch={handleSearch}
                />
            </div>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* FILTERS */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">

                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="h-4 w-4 text-indigo-600" />
                            <h3 className="font-semibold text-slate-900">
                                Filters
                            </h3>

                            {activeFiltersCount > 0 && (
                                <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                                    {activeFiltersCount} active
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">

                            <select
                                value={experienceFilter}
                                onChange={(e) =>
                                    setExperienceFilter(
                                        e.target.value
                                    )
                                }
                                className="w-full lg:w-60 border border-slate-200 rounded-xl px-4 py-2.5 bg-white"
                            >
                                <option>All</option>
                                <option>Internship</option>
                                <option>Entry</option>
                                <option>Mid</option>
                                <option>Senior</option>
                                <option>Lead</option>
                            </select>

                            <select
                                value={employmentFilter}
                                onChange={(e) =>
                                    setEmploymentFilter(
                                        e.target.value
                                    )
                                }
                                className="w-full lg:w-60 border border-slate-200 rounded-xl px-4 py-2.5 bg-white"
                            >
                                <option>All</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Freelance</option>
                                <option>Temporary</option>
                            </select>

                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={() => {
                                        setExperienceFilter("All");
                                        setEmploymentFilter("All");
                                    }}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                                >
                                    <X className="h-4 w-4" />
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* TOOLBAR */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>
                                <p className="text-sm text-slate-500">
                                    {getJobsLoader
                                        ? "Loading opportunities..."
                                        : `${filteredJobs.length} matching jobs`}
                                </p>

                                <h2 className="font-semibold text-slate-900 mt-1">
                                    Available Opportunities
                                </h2>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-xl">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-sm font-medium">
                                        Trending Jobs
                                    </span>
                                </div>

                                <button
                                    onClick={() =>
                                        setSortBy((prev) =>
                                            prev === "newest"
                                                ? "oldest"
                                                : "newest"
                                        )
                                    }
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50"
                                >
                                    <ArrowUpDown className="h-4 w-4" />
                                    <span className="text-sm">
                                        {sortBy === "newest"
                                            ? "Newest First"
                                            : "Oldest First"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* EMPTY STATE */}
                    {!getJobsLoader &&
                    filteredJobs.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">

                            <div className="mx-auto h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                                <Search className="h-8 w-8 text-indigo-600" />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-slate-900">
                                No Jobs Found
                            </h3>

                            <p className="mt-3 text-slate-500 max-w-md mx-auto">
                                Try changing your filters or
                                searching with different keywords.
                            </p>

                            <button
                                onClick={() => {
                                    setExperienceFilter("All");
                                    setEmploymentFilter("All");
                                    setQuery("");
                                    setSelectedCity(
                                        "All locations"
                                    );
                                }}
                                className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {getJobsLoader
                                ? Array.from({
                                      length: 9,
                                  }).map((_, i) => (
                                      <JobCardSkeleton
                                          key={i}
                                      />
                                  ))
                                : filteredJobs.map(
                                      (job: any) => (
                                          <JobCard
                                              key={job._id}
                                              job={job}
                                          />
                                      )
                                  )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllJobs;
