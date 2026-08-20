import { useState, type FormEvent } from "react";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Role = "company" | "applicant";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    setIsLoading(true);

    await axiosInstance
      .post("/api/v1/auth/register", { email, password, role })
      .then(() => {
        toast.success("Registration successful! Please check your email for verification.");
        setSuccess(true);
        setEmail("");
        setPassword("");
        setRole(null);
        navigate("/login");
      })
      .catch((error) => {
        const responseData = error.response?.data;
        const message =
          responseData?.message || "Registration failed. Please try again.";

        console.error("Registration failed:", responseData || error.message);
        toast.error(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] py-5 flex items-center justify-center bg-linear-to-tr from-gray-200 to-gray-300 px-4">
        <div className="relative bg-white rounded-md shadow-xl px-8 py-6 max-w-sm w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Join JobStack
            </h2>
            <p className="text-sm text-gray-500">
              Create an account
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Registration type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRole("company");
                  }}
                  className={`rounded-lg cursor-pointer border-2 px-3 py-3 text-sm font-medium transition-all ${role === "company"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  🏢
                  <span className="block mt-1">Company</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("applicant");
                  }}
                  className={`rounded-lg cursor-pointer border-2 px-3 py-3 text-sm font-medium transition-all ${role === "applicant"
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                >
                  🧑‍💼
                  <span className="block mt-1">Applicant</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="you@example.com"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="********"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-md py-2.5 text-sm transition-colors mt-2"
            >
              {isLoading && (
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {isLoading ? "Registering..." : "Create account"}
            </button>

            {success && (
              <p className="text-green-600 text-sm text-center mt-2">
                Registration successful! Please check your email for verification.
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;