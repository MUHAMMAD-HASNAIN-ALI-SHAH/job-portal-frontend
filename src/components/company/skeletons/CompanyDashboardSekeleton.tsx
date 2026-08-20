const CompanyDashboardSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-slate-200 rounded" />
          <div className="h-4 w-64 bg-slate-200 rounded" />
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded-md" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 space-y-2">
            <div className="h-6 w-12 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Job postings skeleton */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-28 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 w-16 bg-slate-200 rounded" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-100 border-l-4 border-l-slate-200 rounded-xl p-5 space-y-3">
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-6 w-16 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent candidates skeleton */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="h-4 w-32 bg-slate-200 rounded" />
        </div>

        <div className="divide-y divide-slate-100">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-9 w-9 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3.5 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-48 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="h-5 w-16 bg-slate-200 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardSkeleton;