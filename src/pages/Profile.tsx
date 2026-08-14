import ApplicantProfile from "../components/applicant/ApplicantProfile"
import ResumeUpload from "../components/applicant/ResumeUpload"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Profile = () => {
    return (
        <>
            <Navbar />
            <ApplicantProfile />
            <ResumeUpload />
            <Footer />
        </>
    )
}

export default Profile
