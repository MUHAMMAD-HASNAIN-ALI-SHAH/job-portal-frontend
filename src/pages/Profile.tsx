import ApplicantProfile from "../components/profile/ApplicantProfile";
import RecruiterProfile from "../components/profile/RecruiterProfile";
import useAuthStore from "../store/useAuthStore";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-3">
        {user?.role === "applicant" && <ApplicantProfile />}
        {user?.role === "recruiter" && <RecruiterProfile />}
      </div>
    </div>
  );
};

export default Profile;
