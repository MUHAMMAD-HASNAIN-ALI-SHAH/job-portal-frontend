import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Code = () => {
  const {
    codeVerification,
    code,
    handleCodeChange,
    applicantForm,
    recruiterForm,
  } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCodeSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const codeVerify = await codeVerification(
      code,
      applicantForm.email || recruiterForm.email
    );
    if (codeVerify == 200) {
      setLoading(false);
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleCodeSubmit}
        className="flex flex-col gap-4 justify-start py-5 text-start"
      >
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={handleCodeChange}
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 w-full"
          required
        />
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
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
};

export default Code;
