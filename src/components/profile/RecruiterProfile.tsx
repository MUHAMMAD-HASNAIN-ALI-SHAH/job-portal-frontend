import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useRecruiterStore from "../../store/useRecruiterScore";
import { toast } from "react-toastify";

const RecruiterProfile = () => {
  const { recruiter, getRecruiterDetailsLoader, updateRecruiterDetails } =
    useRecruiterStore();
  const { user } = useAuthStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateRecruiter(formData);
    setModalOpen(false);
    toast.success("Details updated successfully");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
      {/* HEADER CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 relative">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-500 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
          {recruiter.companyName?.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 flex justify-between items-center w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            {recruiter.companyName.toUpperCase()}
          </h1>

          {/* Edit Arrow */}
          <button
            onClick={() => setModalOpen(true)}
            className="text-3xl p-2 rounded-full hover:bg-gray-100 transition"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>

      {/* CONTACT + COMPANY INFO CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <i className="ri-mail-fill text-blue-500 text-xl"></i>
              <span className="font-medium text-gray-700">Company Email:</span>
              <span className="text-gray-800 truncate">{user?.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-building-fill text-blue-500 text-xl"></i>
              <span className="font-medium text-gray-700">Company Name:</span>
              <span className="text-gray-800 truncate">
                {recruiter.companyName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-link text-blue-500 text-xl"></i>
              <span className="font-medium text-gray-700">Website:</span>
              <span className="text-blue-600 hover:underline truncate">
                {recruiter.companyWebsite || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-group-fill text-blue-500 text-xl"></i>
              <span className="font-medium text-gray-700">Company Size:</span>
              <span className="text-gray-800">
                {recruiter.companySize || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <i className="ri-community-line text-blue-500 text-xl"></i>
              <span className="font-medium text-gray-700">Industry:</span>
              <span className="text-gray-800">
                {recruiter.industry || "N/A"}
              </span>
            </div>
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-5 md:mx-0">
            <h3 className="text-xl font-semibold mb-4">Edit Company Details</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName || recruiter.companyName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="text"
                name="companyWebsite"
                placeholder="Company Website"
                value={formData.companyWebsite || recruiter.companyWebsite}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="text"
                name="companySize"
                placeholder="Company Size"
                value={formData.companySize || recruiter.companySize}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <input
                type="text"
                name="industry"
                placeholder="Industry"
                value={formData.industry || recruiter.industry}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterProfile;
