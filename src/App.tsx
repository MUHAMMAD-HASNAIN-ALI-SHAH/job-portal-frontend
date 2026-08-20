import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import { Loader2 } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AllJobs from "./pages/AllJobs";
import JobDetails from "./pages/JobDetails";
import AppliedJobs from "./pages/AppliedJobs";

function App() {
  const { verify, isAuthenticated, isAuthenticatedLoading, user } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="w-full">
      {isAuthenticatedLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-jobs" element={<AllJobs />} />
            <Route
              path="/job/:id"
              element={!isAuthenticated ? <Navigate to="/" /> : user?.role === "applicant" ? <JobDetails /> : <Navigate to="/all-jobs" />}
            />
            <Route
              path="/my-applications"
              element={!isAuthenticated ? <Navigate to="/" /> : user?.role === "applicant" ? <AppliedJobs /> : <Navigate to="/all-jobs" />}
            />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route
              path="/profile"
              element={!isAuthenticated ? <Navigate to="/" /> : user?.role === "applicant" ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={!isAuthenticated ? <Navigate to="/" /> : user?.role === "company" ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
