import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    MapPin,
    Video,
    Phone,
    CheckCircle2,
    XCircle,
    Clock3,
    CalendarCheck,
    Inbox,
} from "lucide-react";
import useApplicantStore from "../store/useApplicantStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const statusStyles: Record<string, string> = {
    applied: "bg-indigo-50 text-indigo-700",
    shortlisted: "bg-purple-50 text-purple-700",
    hired: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-600",
};

const statusMessages: Record<string, string> = {
    applied: "Your application has been submitted. The company hasn't reviewed it yet.",
    shortlisted: "You've been shortlisted! See your interview details below.",
    hired: "Congratulations — you've been hired for this role!",
    rejected: "The company has decided not to move forward with your application.",
};

const statusIcon = (status: string) => {
    switch (status) {
        case "shortlisted":
            return <Clock3 className="h-4 w-4" />;
        case "hired":
            return <CheckCircle2 className="h-4 w-4" />;
        case "rejected":
            return <XCircle className="h-4 w-4" />;
        default:
            return <Clock3 className="h-4 w-4" />;
    }
};

const modeIcon = (mode: string, className = "h-4 w-4 text-indigo-500 mt-0.5 shrink-0") => {
    if (mode === "in-person") return <MapPin className={className} />;
    if (mode === "online") return <Video className={className} />;
    return <Phone className={className} />;
};

const InfoCard = ({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
        {icon}
        <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-400 mb-1">{label}</p>
            {children}
        </div>
    </div>
);

const InterviewDetails = ({ application }: { application: any }) => (
    <div className="border-t border-slate-100 bg-indigo-50/40 p-5">
        <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <CalendarCheck className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Interview Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <InfoCard icon={<Calendar className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Date">
                <p className="text-sm font-medium text-slate-800 truncate">
                    {application.interviewDate ? new Date(application.interviewDate).toLocaleDateString() : "N/A"}
                </p>
            </InfoCard>

            <InfoCard icon={<Clock className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Time">
                <p className="text-sm font-medium text-slate-800 truncate">{application.interviewTime || "N/A"}</p>
            </InfoCard>

            <InfoCard icon={modeIcon(application.interviewMode)} label="Mode">
                <p className="text-sm font-medium text-slate-800 truncate">
                    {application.interviewMode === "in-person"
                        ? "In-Person"
                        : application.interviewMode === "online"
                            ? "Online"
                            : "Phone"}
                </p>
            </InfoCard>

            <div className="sm:col-span-2 lg:col-span-1">
                <InfoCard
                    icon={modeIcon(application.interviewMode === "in-person" ? "in-person" : "online")}
                    label={application.interviewMode === "in-person" ? "Location" : "Meeting Link"}
                >
                    {application.interviewMode === "online" && application.interviewLocation ? (
                        <a
                            href={application.interviewLocation}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-indigo-600 hover:underline truncate block"
                        >
                            Join Meeting
                        </a>
                    ) : (
                        <p className="text-sm font-medium text-slate-800 truncate">
                            {application.interviewLocation || "N/A"}
                        </p>
                    )}
                </InfoCard>
            </div>
        </div>
    </div>
);

const ApplicantApplicationCard = ({ application }: { application: any }) => {
    const status = application.status?.toLowerCase() || "applied";

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-slate-900 truncate">
                            {application.jobId?.title || "Untitled position"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Applied on {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium w-fit shrink-0 ${statusStyles[status]}`}
                    >
                        {statusIcon(status)}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>

                <p className="text-sm text-slate-500 mt-3 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                    {statusMessages[status]}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-xs text-slate-400">
                    {application.expectedSalary != null && (
                        <span>Expected salary: {application.expectedSalary.toLocaleString()}</span>
                    )}
                    {application.noticePeriod != null && <span>Notice period: {application.noticePeriod} days</span>}
                </div>
            </div>

            {status === "shortlisted" && <InterviewDetails application={application} />}
        </div>
    );
};

const ApplicationCardSkeleton = () => (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 animate-pulse">
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-slate-200 rounded" />
                <div className="h-3 w-32 bg-slate-200 rounded" />
            </div>
            <div className="h-6 w-24 bg-slate-200 rounded-full shrink-0" />
        </div>
        <div className="h-8 w-full bg-slate-200 rounded-lg mt-4" />
    </div>
);

const TABS = [
    { key: "all", label: "All" },
    { key: "applied", label: "Applied" },
    { key: "shortlisted", label: "Shortlisted" },
    { key: "rejected", label: "Rejected" },
    { key: "hired", label: "Hired" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const AppliedJobs = () => {
    const { applications, getMyApplications, getApplicationsLoader } = useApplicantStore();
    const [activeTab, setActiveTab] = useState<TabKey>("all");

    useEffect(() => {
        getMyApplications();
    }, []);

    const counts: Record<TabKey, number> = {
        all: applications.length,
        applied: applications.filter((a: any) => a.status === "applied").length,
        shortlisted: applications.filter((a: any) => a.status === "shortlisted").length,
        rejected: applications.filter((a: any) => a.status === "rejected").length,
        hired: applications.filter((a: any) => a.status === "hired").length,
    };

    const filteredApplications =
        activeTab === "all" ? applications : applications.filter((a: any) => a.status === activeTab);

    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Applications</h1>
                    <p className="text-slate-500 mt-1">
                        {getApplicationsLoader ? "Loading your applications..." : `Total applications: ${applications.length}`}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab.key
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab.label}
                            <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${activeTab === tab.key ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-500"
                                    }`}
                            >
                                {counts[tab.key]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* List */}
                {getApplicationsLoader ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <ApplicationCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                            <Inbox className="h-6 w-6 text-slate-400" />
                        </div>
                        <p className="text-slate-500 text-sm">
                            {activeTab === "all" ? "You haven't applied to any jobs yet." : `No ${activeTab} applications.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredApplications.map((app: any) => (
                            <ApplicantApplicationCard key={app._id} application={app} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default AppliedJobs;