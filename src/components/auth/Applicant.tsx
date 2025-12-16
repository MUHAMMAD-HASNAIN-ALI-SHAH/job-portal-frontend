import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const Applicant = () => {
  const {
    setRegisterStage,
    applicantRegistration,
    applicantForm,
    handleChangeApplicantForm,
  } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const registration = await applicantRegistration(applicantForm);
      if (registration == 200) {
        setRegisterStage("code-verification");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full text-center">
      <form className="flex flex-col gap-4 text-start" onSubmit={handleSubmit}>
        {/** Full Name */}
        <div className="relative">
          <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={applicantForm.fullName}
            onChange={handleChangeApplicantForm}
            required
            className="border border-gray-300 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/** Email */}
        <div className="relative">
          <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={applicantForm.email}
            onChange={handleChangeApplicantForm}
            required
            className="border border-gray-300 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/** Password */}
        <div className="relative">
          <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={applicantForm.password}
            onChange={handleChangeApplicantForm}
            required
            className="border border-gray-300 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/** Phone */}
        <div className="relative">
          <i className="ri-phone-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={applicantForm.phone}
            onChange={handleChangeApplicantForm}
            className="border border-gray-300 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/** Location */}
        <div className="relative">
          <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={applicantForm.location}
            onChange={handleChangeApplicantForm}
            className="border border-gray-300 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Country */}
        <div className="relative">
          <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          <input
            type="text"
            name="country"
            disabled
            placeholder="Country"
            defaultValue={"Pakistan"}
            className="border border-gray-300 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-indigo-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center ${
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
            "Sign Up"
          )}
        </button>
      </form>

      <div className="py-4">
        <p className="text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Applicant;
