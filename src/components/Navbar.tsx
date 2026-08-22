import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  ChevronDown,
  Briefcase,
  User,
  LogOut,
  LayoutDashboard,
  FileText,
  Search,
} from "lucide-react";

interface NavLinkType {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const COMPANY_LINKS: NavLinkType[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
  },
];

const APPLICANT_LINKS: NavLinkType[] = [
  {
    to: "/profile",
    label: "Profile",
    icon: <User size={16} />,
  },
  {
    to: "/all-jobs",
    label: "Browse Jobs",
    icon: <Briefcase size={16} />,
  },
  {
    to: "/my-applications",
    label: "Applications",
    icon: <FileText size={16} />,
  },
];

const Navbar = () => {
  const { user, onLogout } = useAuthStore();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const links =
    user?.role === "applicant"
      ? APPLICANT_LINKS
      : COMPANY_LINKS;

  const initial =
    user?.email?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <>
      <header className="fixed w-full top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              <Briefcase size={18} />
            </div>

            <div>
              <h2 className="font-bold text-lg text-slate-900 leading-none">
                JobStack
              </h2>
              <p className="text-[10px] text-slate-500 tracking-wide">
                Career Platform
              </p>
            </div>
          </Link>

          {/* CENTER NAVIGATION */}
          {!user && (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-50 rounded-full px-1.5 py-1.5 border border-slate-100">
              <a
              href="#about"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm px-3.5 py-1.5 rounded-full transition-all"
              >
                About
              </a>

              <a
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm px-3.5 py-1.5 rounded-full transition-all"
              >
                Features
              </a>

              <a
              href="#skills"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm px-3.5 py-1.5 rounded-full transition-all"
              >
                Skills
              </a>

              <Link
                to="/all-jobs"
                className={`text-sm font-medium px-3.5 py-1.5 rounded-full transition-all ${
                  location.pathname === "/all-jobs"
                    ? "text-indigo-600 bg-white shadow-sm"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                Jobs
              </Link>
            </nav>
          )}

          {/* USER QUICK LINKS */}
          {user?.role === "applicant" && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 rounded-full px-1.5 py-1.5 border border-slate-100">
              <Link
                to="/all-jobs"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  location.pathname === "/all-jobs"
                    ? "text-indigo-600 bg-white shadow-sm"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <Search size={15} />
                Browse Jobs
              </Link>

              <Link
                to="/my-applications"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  location.pathname === "/my-applications"
                    ? "text-indigo-600 bg-white shadow-sm"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <FileText size={15} />
                Applications
              </Link>
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* GUEST BUTTONS */}
            {!user && (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* USER MENU */}
            {user && (
              <div
                className="relative"
                ref={dropdownRef}
              >
                <button
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                  className="flex items-center gap-2 border border-slate-200 rounded-full pl-1.5 pr-3 py-1.5 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 text-white font-semibold flex items-center justify-center shadow-sm">
                    {initial}
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform ${
                      dropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">

                    <div className="px-4 py-4 border-b border-slate-100 bg-linear-to-br from-indigo-50/60 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 text-white font-semibold flex items-center justify-center shrink-0 shadow-sm">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate text-sm">
                            {user.email}
                          </p>
                          <p className="text-xs text-slate-500 capitalize mt-0.5">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() =>
                            setDropdownOpen(
                              false
                            )
                          }
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 p-2">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
