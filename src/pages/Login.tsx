import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    const loginAction = await login(formData.email, formData.password);

    if (loginAction === 200) {
      setLoading(false);
      navigate("/");
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] py-5 flex items-center justify-center bg-linear-to-tr from-gray-200 to-gray-300 px-4">
        <div className="relative bg-white rounded-md shadow-xl px-8 py-6 max-w-sm w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500">
              Log in to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                value={formData.email}
                onChange={handleChange}
                required
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
                name="password"
                placeholder="********"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-md py-2.5 text-sm transition-colors mt-2"
            >
              {loading && (
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;