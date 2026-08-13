import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type VerificationStatus = "loading" | "success" | "error";

const EmailVerification = () => {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("Verifying your email...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification link is invalid or missing.");
      return;
    }

    axiosInstance
      .post(`/api/v1/auth/verify-email`, {
        token,
      })
      .then(() => {
        setStatus("success");
        setMessage("Email verified successfully!");
        toast.success("Email verified successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      })
      .catch((error) => {
        const errMessage =
          error.response?.data?.msg ||
          "Verification failed. The link may have expired.";

        setStatus("error");
        setMessage(errMessage);
        toast.error(errMessage);
        console.error("Email verification failed:", error.response?.data || error.message);
      });
  }, [searchParams, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] py-5 flex items-center justify-center bg-linear-to-tr from-gray-200 to-gray-300 px-4">
        <div className="relative bg-white rounded-md shadow-xl px-8 py-6 max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Email verification
          </h2>

          {status === "loading" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <span className="h-8 w-8 border-2 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-2xl">
                ✓
              </div>
              <p className="text-green-600 text-sm font-medium">{message}</p>
              <p className="text-xs text-gray-500">Redirecting to login...</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-2xl">
                ✕
              </div>
              <p className="text-red-500 text-sm font-medium">{message}</p>
              <button
                onClick={() => navigate("/login")}
                className="mt-2 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md py-2.5 text-sm transition-colors"
              >
                Go to login
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmailVerification;