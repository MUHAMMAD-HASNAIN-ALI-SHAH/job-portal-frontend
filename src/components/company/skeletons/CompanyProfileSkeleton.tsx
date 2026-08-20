const CompanyProfileSkeleton = () => {
    return (
        <div className="w-full animate-pulse">
            {/* Header card skeleton */}
            <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="h-20 w-20 rounded-xl bg-slate-200 shrink-0" />

                <div className="flex-1 space-y-3">
                    <div className="h-6 w-48 bg-slate-200 rounded" />
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                    <div className="h-4 w-40 bg-slate-200 rounded" />
                </div>

                <div className="h-9 w-28 bg-slate-200 rounded-md self-start sm:self-center" />
            </div>

            {/* Details skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border-l-2 border-slate-200 rounded-r-xl p-5 space-y-2"
                    >
                        <div className="h-3 w-20 bg-slate-200 rounded" />
                        <div className="h-4 w-36 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>

            {/* About skeleton */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 mt-6 space-y-2">
                <div className="h-4 w-16 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-200 rounded" />
                <div className="h-3 w-2/3 bg-slate-200 rounded" />
            </div>
        </div>
    );
};

export default CompanyProfileSkeleton;
