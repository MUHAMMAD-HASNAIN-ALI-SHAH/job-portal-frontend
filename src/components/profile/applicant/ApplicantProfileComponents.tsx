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