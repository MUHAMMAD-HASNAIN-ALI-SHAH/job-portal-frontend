import { Inbox } from "lucide-react";
import useCompanyStore from "../../../store/useCompanyStore";
import ApplicationsJobCard from "../components/company-applications/ApplicationsJobCard";
import useCompanyNavigationStore from "../../../store/useCompanyNavigationStore";
import JobApplications from "../components/company-applications/JobApplications";
import ApplicationCardSkeleton from "../skeletons/ApplicationCardSkeleton";

const CompanyApplications = () => {
  let { getApplicationsLoader, jobs } = useCompanyStore();
  const { applicationJobId } = useCompanyNavigationStore();

  jobs = jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());

  if (applicationJobId) {
    return <JobApplications job={jobs.find((j) => j._id === applicationJobId)!} />
  }

  return (
    <div className="">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          All Jobs
        </h2>
        <p className="text-sm text-slate-500">
          View all applications received for your job postings.
        </p>
      </div>

      {/* List */}
      {getApplicationsLoader ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <ApplicationCardSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">

          <div className="mx-auto h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
            <Inbox className="h-6 w-6 text-slate-400" />
          </div>

          <h3 className="mt-6 text-2xl  font-bold text-slate-900">
            No Jobs and Applications Found
          </h3>

          <p className="mt-3 text-slate-500 max-w-md mx-auto">
            Add a job posting to start receiving applications from candidates.
          </p>
        </div>
      ) : (
        <div className="">
          {jobs.map((job: any) => (
            <ApplicationsJobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyApplications;