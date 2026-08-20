const ApplicationCardSkeleton = () => (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 animate-pulse">
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 bg-slate-200 rounded" />
                    <div className="h-3 w-56 bg-slate-200 rounded" />
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="h-6 w-20 bg-slate-200 rounded-full" />
                <div className="h-8 w-28 bg-slate-200 rounded-md" />
            </div>
        </div>
    </div>
);

export default ApplicationCardSkeleton;
