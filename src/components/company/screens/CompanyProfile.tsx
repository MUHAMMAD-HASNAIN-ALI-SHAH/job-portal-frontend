import useCompanyStore from "../../../store/useCompanyStore";
import useCompanyNavigationStore from "../../../store/useCompanyNavigationStore";
import CompanyProfileSkeleton from "../skeletons/CompanyProfileSkeleton";

const CompanyProfile = () => {
    const { setEditCompanyProfile } = useCompanyNavigationStore();
    const { company, getCompanyDetailsLoader } = useCompanyStore();

    return (
        <div className="bg-slate-50">
            {
                !getCompanyDetailsLoader ? (
                    <div className="w-full">
                        {/* Header card */}
                        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                            {
                                company?.logo ? (
                                    <img
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        className="h-20 w-20 rounded-xl object-cover shrink-0"
                                    />
                                ) : (
                                    <div className="h-20 w-20 rounded-xl bg-indigo-50 text-indigo-700 text-2xl font-bold flex items-center justify-center shrink-0">
                                        {company?.name?.charAt(0) || "N/A"}
                                    </div>
                                )
                            }

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-slate-900">{company?.name || "N/A"}</h1>
                                <p className="text-slate-500 text-sm mt-1">{company?.industry || "Industry"}</p>
                                <p className="text-slate-400 text-sm mt-1">{company?.location || "Location"}</p>
                            </div>

                            <button
                                onClick={() => {
                                    setEditCompanyProfile(true);
                                }}
                                className="self-start sm:self-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                            >
                                Edit profile
                            </button>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5">
                                <p className="text-xs text-slate-400 mb-1">Contact email</p>
                                <p className="text-slate-800 text-sm font-medium">{company?.email || "N/A"}</p>
                            </div>

                            <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5">
                                <p className="text-xs text-slate-400 mb-1">Industry</p>
                                <p className="text-slate-800 text-sm font-medium">{company?.industry || "N/A"}</p>
                            </div>

                            <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5">
                                <p className="text-xs text-slate-400 mb-1">Company size</p>
                                <p className="text-slate-800 text-sm font-medium">{company?.size || "N/A"}</p>
                            </div>

                            <div className="bg-white border-l-2 border-indigo-600 rounded-r-xl p-5">
                                <p className="text-xs text-slate-400 mb-1">Website</p>
                                <a
                                    href={company?.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-600 text-sm font-medium hover:underline break-all"
                                >
                                    {company?.website || "N/A"}
                                </a>
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white border border-slate-100 rounded-xl p-6 mt-6">
                            <h2 className="text-sm font-semibold text-slate-900 mb-2">About</h2>
                            <p className="text-slate-600 text-sm leading-relaxed">{company?.about || "N/A"}</p>
                        </div>
                    </div>

                ) : (
                    <CompanyProfileSkeleton />
                )
            }
        </div>
    );
};

export default CompanyProfile;
