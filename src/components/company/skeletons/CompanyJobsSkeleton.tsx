const CompanyJobsSkeleton = () => {
    return (
        <div className="mb-10 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-40 bg-slate-200 rounded" />
            </div>

            <div className="flex items-center gap-4 mb-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-3 w-16 bg-slate-200 rounded" />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white border border-slate-100 border-l-4 border-l-slate-200 rounded-xl p-5 space-y-3"
                    >
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                        <div className="h-3 w-1/2 bg-slate-200 rounded" />
                        <div className="h-3 w-full bg-slate-200 rounded" />
                        <div className="h-3 w-2/3 bg-slate-200 rounded" />
                        <div className="h-6 w-16 bg-slate-200 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyJobsSkeleton;