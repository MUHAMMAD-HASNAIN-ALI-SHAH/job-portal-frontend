import type { Application } from "../../../../interfaces"

const ATSMatchCard = ({application}:{application: Application}) => {
    return (
        <>
            {application.atsMatchPercentage != null && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                ATS Match Score
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-2xl font-bold text-slate-900">
                                    {application.atsMatchPercentage}%
                                </span>

                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${application.atsMatchPercentage >= 85
                                        ? "bg-emerald-100 text-emerald-700"
                                        : application.atsMatchPercentage >= 75
                                            ? "bg-green-100 text-green-700"
                                            : application.atsMatchPercentage >= 65
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {application.atsMatchPercentage >= 85
                                        ? "Excellent Match"
                                        : application.atsMatchPercentage >= 75
                                            ? "Strong Match"
                                            : application.atsMatchPercentage >= 65
                                                ? "Good Match"
                                                : "Needs Review"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className={`h-full rounded-full transition-all duration-700 ${application.atsMatchPercentage >= 85
                                    ? "bg-emerald-500"
                                    : application.atsMatchPercentage >= 75
                                        ? "bg-green-500"
                                        : application.atsMatchPercentage >= 65
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                    }`}
                                style={{
                                    width: `${Math.min(
                                        100,
                                        Math.max(0, application.atsMatchPercentage)
                                    )}%`,
                                }}
                            />
                        </div>

                        <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-500">
                        {application.atsMatchPercentage >= 85
                            ? "Excellent alignment with job requirements."
                            : application.atsMatchPercentage >= 75
                                ? "Strong candidate with high relevance."
                                : application.atsMatchPercentage >= 60
                                    ? "Good match, review recommended."
                                    : "Limited alignment with job requirements."}
                    </div>
                </div>
            )}
        </>
    )
}

export default ATSMatchCard
