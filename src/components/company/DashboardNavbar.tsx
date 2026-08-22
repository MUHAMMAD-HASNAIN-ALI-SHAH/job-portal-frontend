import useCompanyStore from "../../store/useCompanyStore";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Mail } from "lucide-react";

const DashboardNavbar = () => {
    const { company } = useCompanyStore();

    const initials = (company?.name || "Company Name")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word: string) => word[0])
        .join("")
        .toUpperCase();

    return (
        <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl">
            <div className="flex min-h-17 items-center justify-between gap-4 px-4 sm:px-6">
                {/* Left Side */}
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <SidebarTrigger className="text-slate-500 hover:text-slate-900" />
                    <Separator orientation="vertical" className="h-6 hidden sm:block" />

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700 text-xs font-semibold text-white shadow-sm">
                            {initials}
                        </div>
                        <div className="flex min-w-0 flex-col">
                            <h1 className="truncate text-base sm:text-lg font-semibold leading-tight text-slate-900">
                                {company?.name || "Company Name"}
                            </h1>
                            <p className="truncate text-xs sm:text-sm text-slate-500">
                                {company?.industry || "Industry"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <p className="max-w-40 truncate text-xs font-medium text-slate-600">
                            {company?.email || "Email"}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;