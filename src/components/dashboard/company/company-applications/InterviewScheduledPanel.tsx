import { useState } from "react";
import useCompanyStore from "../../../../store/useCompanyStore";
import { toast } from "react-toastify";
import axiosInstance from "../../../../lib/axios";
import { Calendar, CalendarCheck, Clock, MapPin, Pencil, Phone, Video } from "lucide-react";

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
    const { editApplication } = useCompanyStore();

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [date, setDate] = useState(application.interviewDate ? application.interviewDate.slice(0, 10) : "");
    const [time, setTime] = useState(application.interviewTime || "");
    const [mode, setMode] = useState<"in-person" | "online" | "phone">(
        application.interviewMode || "in-person"
    );
    const [location, setLocation] = useState(application.interviewLocation || "");

    const startEditing = () => {
        setDate(application.interviewDate ? application.interviewDate.slice(0, 10) : "");
        setTime(application.interviewTime || "");
        setMode(application.interviewMode || "in-person");
        setLocation(application.interviewLocation || "");
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!date || !time) {
            toast.error("Please select both date and time for the interview.");
            return;
        }
        if (mode !== "phone" && !location) {
            toast.error(mode === "in-person" ? "Please provide the interview location." : "Please provide the meeting link.");
            return;
        }

        setIsSaving(true);

        try {
            await axiosInstance.put(`/api/v6/application/status`, {
                applicationId: application._id,
                status: "shortlisted",
                interviewMode: mode,
                interviewLocation: location,
                interviewDate: date,
                interviewTime: time,
                zoomLink: mode === "online" ? location : undefined,
            });

            editApplication(application._id, {
                status: "shortlisted",
                interviewMode: mode,
                interviewLocation: location,
                interviewDate: date,
                interviewTime: time,
            });

            toast.success("Interview details updated successfully.");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update interview details:", error);
            toast.error("Failed to update interview details.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="border-t border-slate-100 bg-indigo-50/40 p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <CalendarCheck className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">Interview Scheduled</h3>
                </div>

                <button
                    type="button"
                    onClick={() => (isEditing ? setIsEditing(false) : startEditing())}
                    className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    {isEditing ? "Cancel" : "Edit"}
                </button>
            </div>

            {!isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <InterviewInfoCard icon={<Calendar className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Date">
                        <p className="text-sm font-medium text-slate-800 truncate">
                            {application.interviewDate ? new Date(application.interviewDate).toLocaleDateString() : "N/A"}
                        </p>
                    </InterviewInfoCard>

                    <InterviewInfoCard icon={<Clock className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Time">
                        <p className="text-sm font-medium text-slate-800 truncate">{application.interviewTime || "N/A"}</p>
                    </InterviewInfoCard>

                    <InterviewInfoCard icon={modeIcon(application.interviewMode)} label="Mode">
                        <p className="text-sm font-medium text-slate-800 truncate">
                            {application.interviewMode === "in-person"
                                ? "In-Person"
                                : application.interviewMode === "online"
                                    ? "Online"
                                    : "Phone"}
                        </p>
                    </InterviewInfoCard>

                    <div className="sm:col-span-2 lg:col-span-1">
                        <InterviewInfoCard
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
                                <p className="text-sm font-medium text-slate-800 truncate">{application.interviewLocation || "N/A"}</p>
                            )}
                        </InterviewInfoCard>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <InterviewInfoCard icon={<Calendar className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Date">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5"
                            />
                        </InterviewInfoCard>

                        <InterviewInfoCard icon={<Clock className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />} label="Time">
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5"
                            />
                        </InterviewInfoCard>

                        <InterviewInfoCard icon={modeIcon(mode)} label="Mode">
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value as "in-person" | "online" | "phone")}
                                className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5 bg-white"
                            >
                                <option value="in-person">In-Person</option>
                                <option value="online">Online</option>
                                <option value="phone">Phone</option>
                            </select>
                        </InterviewInfoCard>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <InterviewInfoCard
                                icon={modeIcon(mode === "in-person" ? "in-person" : "online")}
                                label={mode === "in-person" ? "Location" : "Meeting Link"}
                            >
                                {mode === "phone" ? (
                                    <p className="text-sm text-slate-400">Not applicable</p>
                                ) : (
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder={mode === "in-person" ? "Office address" : "https://..."}
                                        className="w-full text-sm font-medium text-slate-800 outline-none border-b border-slate-200 focus:border-indigo-500 pb-0.5"
                                    />
                                )}
                            </InterviewInfoCard>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            {isSaving && <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterviewScheduledPanel;
