import useApplicantStore from "../../../store/useApplicantStore";
import useAuthStore from "../../../store/useAuthStore";
import ResumeSection from "./ResumeSection";

const ApplicantProfile = () => {
  const { user } = useAuthStore();
  const { applicant, getApplicantDetailsLoader } = useApplicantStore();

  // If loader is true, show a spinner or loading message
  if (getApplicantDetailsLoader) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-10 w-10"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          {applicant?.fullName}
        </h1>

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-500 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
          {applicant?.fullName?.charAt(0).toUpperCase()}
        </div>
      </section>

      {/* Contact Info */}
      <section className="relative flex flex-col gap-2 cursor-pointer">
        <i className="ri-arrow-right-s-line font-semibold text-xl sm:text-2xl absolute right-0 top-1/2 -translate-y-1/2"></i>

        <h1 className="text-base sm:text-xl break-all">
          <i className="ri-mail-fill mr-1"></i> {user?.email}
        </h1>

        <h1 className="text-base sm:text-xl">
          <i className="ri-phone-fill mr-1"></i> {applicant?.phone}
        </h1>

        <h1 className="text-base sm:text-xl">
          <i className="ri-map-pin-2-fill mr-1"></i> {applicant?.location},
          Pakistan
        </h1>
      </section>

      {/* Resume Section */}
      <ResumeSection />
    </div>
  );
};

export default ApplicantProfile;
