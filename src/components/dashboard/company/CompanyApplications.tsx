import { useEffect, useState } from "react";
import { Inbox } from "lucide-react";
import ApplicationsCard from "./company-applications/ApplicationsCard";
import useCompanyStore from "../../../store/useCompanyStore";
import ApplicationCardSkeleton from "./company-applications/ApplicationCardSkeleton";

const TABS = [
  { key: "applied", label: "Applied" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "hired", label: "Hired" },
  { key: "rejected", label: "Rejected" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const Applications = () => {
  const { applications, getApplications, getApplicationsLoader } = useCompanyStore();
  const [activeTab, setActiveTab] = useState<TabKey>("applied");

  useEffect(() => {
    getApplications();
  }, []);

  const counts: Record<TabKey, number> = {
    applied: applications.filter((app) => app.status === "applied").length,
    shortlisted: applications.filter((app) => app.status === "shortlisted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    hired: applications.filter((app) => app.status === "hired").length,
  };

  const filteredApplications = applications.filter((app) => app.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Applications</h1>
        <p className="text-slate-500 mt-1">
          {getApplicationsLoader ? "Loading applications..." : `Total applications: ${applications.length}`}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                activeTab === tab.key ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {getApplicationsLoader ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <ApplicationCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
            <Inbox className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">No {activeTab} applications found.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredApplications.map((app: any) => (
            <ApplicationsCard key={app._id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;