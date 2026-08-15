import { toast } from "react-toastify";
import {
    Calendar,
    Clock,
    MapPin,
    Video,
    Phone,
} from "lucide-react";
import axiosInstance from "../../../../lib/axios";
import useCompanyStore from "../../../../store/useCompanyStore";
import { useState } from "react";

const ScheduleInterviewForm = ({ application }: { application: any }) => {
    const { editApplication } = useCompanyStore();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [mode, setMode] = useState<"in-person" | "online" | "phone">("in-person");
    const [location, setLocation] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async () => {
        if (!date || !time) {
            toast.error("Please select both date and time for the interview.");
            return;
        }
        if (mode !== "phone" && !location) {
            toast.error(
                mode === "in-person"
                    ? "Please provide the interview location for in-person interviews."
                    : "Please provide the meeting link for online interviews."
            );
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
            });

            editApplication(application._id, {
                status: "shortlisted",
                interviewMode: mode,
                interviewLocation: location,
                interviewDate: date,
                interviewTime: time,
            });

            toast.success("Application shortlisted and interview scheduled.");
        } catch (error) {
            console.error("Failed to schedule interview:", error);
            toast.error("Failed to update application status.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="border-t border-slate-100 bg-slate-50 p-5">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="relative">
                    <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        className="pl-8 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                </div>

                <div className="relative">
                    <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        className="pl-8 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                </div>

                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as "in-person" | "online" | "phone")}
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                    <option value="in-person">In-Person</option>
                    <option value="online">Online</option>
                    <option value="phone">Phone</option>
                </select>

                {mode === "in-person" && (
                    <div className="relative flex-1">
                        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="Interview location"
                            className="w-full pl-8 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>
                )}
                {mode === "online" && (
                    <div className="relative flex-1">
                        <Video className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="Interview link"
                            className="w-full pl-8 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>
                )}
                {mode === "phone" && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 px-1">
                        <Phone className="h-4 w-4" /> Applicant will be called directly
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shrink-0"
                >
                    {isSaving && <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default ScheduleInterviewForm;