import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  Menu,
  X,
  ChevronDown,
  Briefcase,
  User,
  LogOut,
  LayoutDashboard,
  FileText,
  Building2,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
              <Briefcase size={18} />
            </div>

            <div>
              <h2 className="font-bold text-lg text-slate-900 leading-none">
                JobStack
              </h2>
              <p className="text-[10px] text-slate-500">
                Career Platform
              </p>
            </div>
          </Link>

          {/* CENTER NAVIGATION */}
          {!user && (
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="/#about"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                About
              </a>

              <a
                href="/#features"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                Features
              </a>

              <a
                href="/#fields"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                Skills
              </a>

              <Link
                to="/all-jobs"
                className={`text-sm font-medium transition ${
                  location.pathname === "/all-jobs"
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-indigo-600"
                }`}
              >
                Jobs
              </Link>

              <a
                href="/#companies"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                Companies
              </a>

              <a
                href="/#contact"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                Contact
              </a>
            </nav>
          )}

          {/* USER QUICK LINKS */}
          {user?.role === "applicant" && (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/all-jobs"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <Search size={15} />
                Browse Jobs
              </Link>

              <Link
                to="/my-applications"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
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
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
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
                  className="flex items-center gap-2 border border-slate-200 rounded-full pl-1.5 pr-3 py-1.5 hover:bg-slate-50 transition"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center">
                    {initial}
                  </div>

                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      dropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">

                    <div className="px-4 py-4 border-b border-slate-100">
                      <p className="font-medium text-slate-900 truncate">
                        {user.email}
                      </p>

                      <p className="text-xs text-slate-500 capitalize mt-1">
                        {user.role}
                      </p>
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
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 p-2">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200"
            >
              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">

            <div className="p-5 border-b">
              <h3 className="font-bold text-lg">
                Menu
              </h3>
            </div>

            <div className="p-4 space-y-2">

              {!user ? (
                <>
                  <a
                    href="/#about"
                    className="block px-4 py-3 rounded-xl hover:bg-slate-100"
                  >
                    About
                  </a>

                  <a
                    href="/#features"
                    className="block px-4 py-3 rounded-xl hover:bg-slate-100"
                  >
                    Features
                  </a>

                  <a
                    href="/#fields"
                    className="block px-4 py-3 rounded-xl hover:bg-slate-100"
                  >
                    Skills
                  </a>

                  <a
                    href="/#companies"
                    className="block px-4 py-3 rounded-xl hover:bg-slate-100"
                  >
                    Companies
                  </a>

                  <Link
                    to="/all-jobs"
                    className="block px-4 py-3 rounded-xl hover:bg-slate-100"
                  >
                    Jobs
                  </Link>

                  <div className="pt-4 border-t">
                    <Link
                      to="/login"
                      className="block text-center border border-slate-200 rounded-xl py-3"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="block text-center bg-indigo-600 text-white rounded-xl py-3 mt-3"
                    >
                      Get Started
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}

                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
