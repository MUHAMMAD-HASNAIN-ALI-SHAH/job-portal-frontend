import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

interface NavLink {
  to: string;
  icon: string;
  label: string;
}

const COMPANY_LINKS: NavLink[] = [
  { to: "/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
];

const APPLICANT_LINKS: NavLink[] = [
  { to: "/profile", icon: "ri-user-3-line", label: "Profile" },
  { to: "/all-jobs", icon: "ri-user-3-line", label: "All Jobs" },
];

const NavLinkItem = ({ to, icon, label, onClick }: NavLink & { onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
  >
    <i className={icon} /> {label}
  </Link>
);

const GuestLinks = () => (
  <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
    <a href="/#about" className="hover:text-slate-900 transition-colors">About</a>
    <a href="/#fields" className="hover:text-slate-900 transition-colors">Hiring fields</a>
    <a href="/all-jobs" className="hover:text-slate-900 transition-colors">Find jobs</a>
  </nav>
);

const GuestButtons = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <Link
      to="/login"
      className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
    >
      Log in
    </Link>
    <Link
      to="/register"
      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
    >
      Get started
    </Link>
  </div>
);

const Navbar = () => {
  const { user, onLogout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => setOpen(false);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = user?.role === "applicant" ? APPLICANT_LINKS : COMPANY_LINKS;
  const initial = user?.email?.charAt(0).toUpperCase() ?? "";

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-lg tracking-tight">
          <i className="ri-briefcase-line text-xl text-indigo-600" />
          Job<span className="text-indigo-600">Stack</span>
        </Link>

        {/* Center links — guests only */}
        {!user && <GuestLinks />}

        {/* Authenticated */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 cursor-pointer rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              <span className="h-7 w-7 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold flex items-center justify-center">
                {initial || <i className="ri-user-3-fill text-base" />}
              </span>
              <i className={`ri-arrow-down-s-line text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                  <p className="text-xs text-slate-400 capitalize mt-0.5">{user?.role}</p>
                </div>
                <div className="py-1">
                  {links.map((link) => (
                    <NavLinkItem key={link.to} {...link} onClick={closeDropdown} />
                  ))}
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <i className="ri-logout-box-line" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Guest */}
        {!user && <GuestButtons />}
      </div>
    </header>
  );
};

export default Navbar;