import { SidebarTrigger } from "../ui/sidebar";

const DashboardNavbar = () => {
    return (
        <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl">
            <div className="flex min-h-17 items-center justify-between px-6">
                {/* Left Side */}
                <div className="flex items-center gap-5">
                        <SidebarTrigger />
                    
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;