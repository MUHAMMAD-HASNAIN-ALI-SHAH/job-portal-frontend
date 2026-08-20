import { Calendar, CalendarCheck, Clock, MapPin, Phone, Video } from "lucide-react";

const modeIcon = (mode: string, className = "h-4 w-4 text-indigo-500 mt-0.5 shrink-0") => {
    if (mode === "in-person") return <MapPin className={className} />;
    if (mode === "online") return <Video className={className} />;
    return <Phone className={className} />;
};

const InterviewInfoCard = ({
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

const InterviewScheduledPanel = ({ application }: { application: any }) => {
    return (
        <div className="border-t border-slate-100 bg-indigo-50/40 p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <CalendarCheck className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">Interview Scheduled</h3>
                </div>
            </div>
                <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <InterviewInfoCard icon={<Calendar className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Date">
                            <input
                                type="date"
                                value={application.interviewDate ? application.interviewDate.slice(0, 10) : ""}
                                disabled
                                className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5"
                            />
                        </InterviewInfoCard>

                        <InterviewInfoCard icon={<Clock className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Time">
                            <input
                                type="time"
                                value={application.interviewTime || ""}
                                disabled
                                className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5"
                            />
                        </InterviewInfoCard>

                        <InterviewInfoCard icon={modeIcon(application.interviewMode)} label="Mode">
                            <select
                                value={application.interviewMode || "in-person"}
                                disabled
                                className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5 bg-white"
                            >
                                <option value="in-person">In-Person</option>
                                <option value="online">Online</option>
                                <option value="phone">Phone</option>
                            </select>
                        </InterviewInfoCard>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <InterviewInfoCard
                                icon={modeIcon(application.interviewMode === "in-person" ? "in-person" : "online")}
                                label={application.interviewMode === "in-person" ? "Location" : "Meeting Link"}
                            >
                                {application.interviewMode === "phone" ? (
                                    <p className="text-sm text-slate-400">Not applicable</p>
                                ) : (
                                    <input
                                        type="text"
                                        value={application.interviewLocation || ""}
                                        disabled
                                        placeholder={application.interviewMode === "in-person" ? "Office address" : "https://..."}
                                        className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5"
                                    />
                                )}
                            </InterviewInfoCard>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default InterviewScheduledPanel;
