import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-gray-200 to-gray-300 px-4">
      <div className="bg-white rounded-md shadow-xl px-8 py-4 max-w-sm w-full text-center">
        <div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto flex justify-center items-center mb-4 text-white text-2xl mt-5">
          <i className="ri-login-box-line"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-500 mb-6">Login to continue your journey!</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-start py-5 text-start"
        >
          {/* Email */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 pl-10 w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Password */}
          <div className="relative flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-2 pl-10 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="py-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
