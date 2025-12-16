import useAuthStore from "../../store/useAuthStore";

const Selection = () => {
  const { setRegisterStage } = useAuthStore();

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={() => setRegisterStage("applicant")}
          className="flex justify-between items-center px-6 py-4 border border-gray-300 cursor-pointer font-semibold rounded-lg transition"
        >
          Applicant
          <i className="ri-arrow-right-line text-lg ml-2"></i>
        </button>
        <button
          onClick={() => setRegisterStage("recruiter")}
          className="flex justify-between items-center px-6 py-4 border border-gray-300 cursor-pointer font-semibold rounded-lg transition"
        >
          Recruiter
          <i className="ri-arrow-right-line text-lg ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default Selection;
