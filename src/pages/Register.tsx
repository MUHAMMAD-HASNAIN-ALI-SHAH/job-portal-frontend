import "react-toastify/dist/ReactToastify.css";
import Selection from "../components/auth/Selection";
import useAuthStore from "../store/useAuthStore";
import Applicant from "../components/auth/Applicant";
import Code from "../components/auth/Code";
import Recruiter from "../components/auth/Recruiter";
import { useEffect } from "react";

const Register = () => {
  const { registerStage,setRegisterStage } = useAuthStore();

  useEffect(() => {
    setRegisterStage("selection");
  }, [setRegisterStage]);

  return (
    <div className="min-h-[80vh] py-5 flex items-center justify-center bg-linear-to-tr from-gray-200 to-gray-300 px-4">
      <div className="bg-white rounded-md shadow-xl px-8 py-4 max-w-sm w-full text-center">
        <div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto flex justify-center items-center mb-4 text-white text-2xl mt-5">
          {registerStage === "selection" ? (
            <i className="ri-user-add-line"></i>
          ) : registerStage === "applicant" ? (
            <i className="ri-user-line"></i>
          ) : (
            <i className="ri-mail-send-line"></i>
          )}
        </div>
        {registerStage === "selection" && (
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Join JobStack
          </h2>
        )}
        {registerStage === "applicant" && (
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Applicant Signup
          </h2>
        )}
        {registerStage === "code-verification" && (
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Your Email
          </h2>
        )}

        {registerStage === "selection" && (
          <p className="text-gray-500 mb-6">
            Select your registration type to get started!
          </p>
        )}
        {registerStage === "applicant" && (
          <p className="text-gray-500 mb-6">
            Create your account to get started!
          </p>
        )}
        {registerStage === "code-verification" && (
          <p className="text-gray-500 mb-6">
            Enter the code sent to your email
          </p>
        )}

        {registerStage === "selection" && <Selection />}
        {registerStage === "applicant" && <Applicant />}
        {registerStage === "recruiter" && <Recruiter />}
        {registerStage === "code-verification" && <Code />}
      </div>
    </div>
  );
};

export default Register;
