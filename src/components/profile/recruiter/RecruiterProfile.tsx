import { useState } from "react";
import useRecruiterStore from "../../../store/useCompanyStore";
import { CompanyBio, CompanyInfoCard, Header, Modal } from "./RecruiterProfileComponents";

const RecruiterProfile = () => {
  const { recruiter, getRecruiterDetailsLoader } = useRecruiterStore();

  const [modalOpen, setModalOpen] = useState(false);

  if (getRecruiterDetailsLoader) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-500 h-12 w-12"></div>
      </div>
    );
  }

  if (!recruiter) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        No recruiter information available.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 py-12 flex flex-col gap-12">
      {/* HEADER CARD */}
      <Header recruiter={recruiter} setModalOpen={setModalOpen} />

      {/* CONTACT + COMPANY INFO CARD */}
      <CompanyInfoCard recruiter={recruiter} />

      {/* Company Bio */}
      <CompanyBio recruiter={recruiter} />

      {/* MODAL */}
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        recruiter={recruiter}
      />
    </div>
  );
};

export default RecruiterProfile;
