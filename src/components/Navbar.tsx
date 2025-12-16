import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { user, onLogout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 font-bold text-2xl"
        >
          <i className="ri-briefcase-line text-3xl"></i>
          JobStack
        </Link>

        {/* Authenticated User */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-full hover:bg-gray-300 transition duration-200"
            >
              <i className="ri-user-3-fill text-2xl"></i>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
                {user.role === "applicant" && (
                  <>
                    <Link
                      to="/all-jobs"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 text-gray-700 transition"
                    >
                      <i className="ri-dashboard-line"></i> Apply for jobs
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 text-gray-700 transition"
                    >
                      <i className="ri-user-settings-line"></i> Profile
                    </Link>
                  </>
                )}
                {user.role === "recruiter" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 text-gray-700 transition"
                    >
                      <i className="ri-dashboard-line"></i> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 text-gray-700 transition"
                    >
                      <i className="ri-user-settings-line"></i> Profile
                    </Link>
                  </>
                )}
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-red-600 transition"
                >
                  <i className="ri-logout-box-line"></i> Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Guest */}
        {!user && (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
