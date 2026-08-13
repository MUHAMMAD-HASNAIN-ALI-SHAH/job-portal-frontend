import { useEffect, useState } from "react";
import useAuthStore from "../../../store/useAuthStore";
import useRecruiterStore from "../../../store/useCompanyStore";

export const CompanyInfoCard = ({ recruiter }: { recruiter: any }) => {
  const { user } = useAuthStore();

  const fields = [
    { icon: "ri-mail-fill", label: "Company Email", value: user?.email },
    {
      icon: "ri-building-fill",
      label: "Company Name",
      value: recruiter.companyName,
    },
    {
      icon: "ri-link",
      label: "Website",
      value: recruiter.companyWebsite || "N/A",
      blue: true,
    },
    {
      icon: "ri-group-fill",
      label: "Company Size",
      value: recruiter.companySize || "N/A",
    },
    {
      icon: "ri-community-line",
      label: "Industry",
      value: recruiter.industry || "N/A",
    },
  ];

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ icon, label, value, blue }) => (
          <div key={label} className="flex items-center gap-2">
            <i className={`${icon} text-blue-500 text-lg md:text-xl`} />
            <span className="font-medium text-md md:text-lg text-gray-700">
              {label}:
            </span>
            <span
              className={`truncate ${blue ? "text-blue-600 hover:underline" : "text-gray-800"} text-sm md:text-lg`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {recruiter.companyLogo && (
        <img
          src={recruiter.companyLogo}
          alt={`${recruiter.companyName} Logo`}
          className="w-48 h-48 object-contain rounded-xl shadow-lg border border-gray-200"
        />
      )}
    </div>
  );
};

export const CompanyBio = ({ recruiter }: { recruiter: any }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <span className="font-medium text-left text-gray-700 flex flex-row items-center gap-2 text-lg md:text-xl">
            <i
              className={`ri-book-open-fill text-blue-500 text-lg md:text-xl`}
            />
            Company Bio:
          </span>
          <span className="text-gray-800 text-justify">
            {recruiter.bio || "N/A"}
          </span>
        </div>
      </div>

      {recruiter.companyLogo && (
        <img
          src={recruiter.companyLogo}
          alt={`${recruiter.companyName} Logo`}
          className="w-48 h-48 object-contain rounded-xl shadow-lg border border-gray-200"
        />
      )}
    </div>
  );
};

export const Modal = ({
  modalOpen,
  setModalOpen,
  recruiter,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  recruiter: any;
}) => {
  const { updateRecruiterDetails } = useRecruiterStore();

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    bio: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateRecruiterDetails(formData);
    setModalOpen(false);
  };

  const resetFormDataToNormal = () => {
    setFormData({
      companyName: recruiter.companyName || "N/A",
      companyWebsite: recruiter.companyWebsite || "N/A",
      companySize: recruiter.companySize || "N/A",
      industry: recruiter.industry || "N/A",
      bio: recruiter.bio || "N/A",
    });
  };

  useEffect(() => {
    if (recruiter) {
      resetFormDataToNormal();
    }
  }, []);

  const closeModal = () => {
    resetFormDataToNormal();
    setModalOpen(false);
  };

  const disabledSaveButton = () => {
    if (
      formData.companyWebsite === recruiter.companyWebsite &&
      formData.companySize === recruiter.companySize &&
      formData.industry === recruiter.industry &&
      formData.bio === recruiter.bio
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-5 md:mx-0">
            <h3 className="text-xl font-semibold mb-4">Edit Company Details</h3>
            <div className="flex flex-col gap-3">
              <input
                disabled
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName || recruiter.companyName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none text-gray-500 cursor-not-allowed"
              />
              <input
                type="text"
                name="companyWebsite"
                placeholder="Company Website"
                value={formData.companyWebsite || recruiter.companyWebsite}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <select
                name="companySize"
                value={formData.companySize || recruiter.companySize}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              >
                <option value="" disabled>
                  Company Size
                </option>
                {[
                  "select",
                  "1-10",
                  "11-50",
                  "51-200",
                  "201-500",
                  "501-1000",
                  "1000+",
                ].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <select
                name="industry"
                value={formData.industry || recruiter.industry}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              >
                <option value="" disabled>
                  Industry
                </option>
                {[
                  "select",
                  "Technology",
                  "Finance",
                  "Healthcare",
                  "Education",
                  "Retail",
                  "Manufacturing",
                  "Other",
                ].map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <textarea
                name="bio"
                placeholder="Company Bio"
                value={formData.bio || recruiter.bio}
                onChange={handleInputChange}
                rows={10}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => closeModal()}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={disabledSaveButton()}
                  className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${disabledSaveButton() ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const Header = ({
  recruiter,
  setModalOpen,
}: {
  recruiter: any;
  setModalOpen: any;
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 relative">
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-500 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
        {recruiter.companyName?.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          {recruiter.companyName.toUpperCase()}
        </h1>

        {/* Edit Arrow */}
        <button
          onClick={() => setModalOpen(true)}
          className="text-lg p-2 rounded-md hover:bg-blue-800 cursor-pointer transition bg-blue-600 text-white"
        >
          Edit Company Details
        </button>
      </div>
    </div>
  );
};
