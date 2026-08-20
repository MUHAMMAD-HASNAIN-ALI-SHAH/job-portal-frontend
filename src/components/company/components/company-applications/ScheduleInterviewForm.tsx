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
    const [interviewLocation, setInterviewLocation] = useState("");
    const [zoomLink, setZoomLink] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async () => {
        setIsSaving(true);

        try {
            await axiosInstance.put(`/api/v6/application/status`, {
                applicationId: application._id,
                status: "shortlisted",
                interviewMode: mode,
                interviewLocation,
                zoomLink,
                interviewDate: date,
                interviewTime: time,
            });

            editApplication(application._id, {
                status: "shortlisted",
                interviewMode: mode,
                interviewLocation,
                zoomLink,
                interviewDate: date,
                interviewTime: time,
            });

            toast.success("Application shortlisted and interview scheduled.");
        } catch (error: any) {
            console.error("Failed to schedule interview:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to schedule interview."
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full border-t border-slate-200 bg-slate-50 p-4 rounded-b-xl">
            <div className="flex flex-col gap-3 w-full">

                {/* Date & Time */}
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="relative w-full">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className="w-full pl-10 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>

                    <div className="relative w-full">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="time"
                            className="w-full pl-10 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* Mode & Details */}
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <select
                        value={mode}
                        onChange={(e) =>
                            setMode(
                                e.target.value as
                                | "in-person"
                                | "online"
                                | "phone"
                            )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                        <option value="in-person">📍 In-Person</option>
                        <option value="online">💻 Online</option>
                        <option value="phone">📞 Phone</option>
                    </select>

                    {mode === "in-person" && (
                        <div className="relative w-full">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                            <input
                                value={interviewLocation}
                                onChange={(e) =>
                                    setInterviewLocation(e.target.value)
                                }
                                type="text"
                                placeholder="Interview location"
                                className="w-full pl-10 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                        </div>
                    )}

                    {mode === "online" && (
                        <div className="relative w-full">
                            <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                            <input
                                value={zoomLink}
                                onChange={(e) => setZoomLink(e.target.value)}
                                type="text"
                                placeholder="Interview link"
                                className="w-full pl-10 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                            />
                        </div>
                    )}

                    {mode === "phone" && (
                        <div className="w-full flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600">
                            <Phone className="h-4 w-4 mr-2 text-slate-500" />
                            Applicant will be called directly
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="w-full md:w-fit md:self-end flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isSaving && (
                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    )}
                    {isSaving ? "Saving..." : "Schedule Interview"}
                </button>

            </div>
        </div>
    );
};

export default ScheduleInterviewForm;