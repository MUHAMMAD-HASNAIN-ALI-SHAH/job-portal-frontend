import useCompanyNavigationStore from "../../store/useCompanyNavigationStore"
import CompanyDashboard from "./screens/CompanyDashboard"
import CompanyProfileForm from "./components/company-profile/CompanyProfileForm"
import EditJob from "./components/company-jobs/EditJob"
import DashboardNavbar from "./DashboardNavbar"
import CompanyAddJob from "./screens/CompanyAddJob"
import CompanyJobs from "./screens/CompanyJobs"
import CompanyProfile from "./screens/CompanyProfile"
import CompanyApplications from "./screens/CompanyApplications"

const MainScreen = () => {
  const { sidebarMenu, editJobId, editCompanyProfile } = useCompanyNavigationStore()
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <div className="flex h-full w-full flex-col">
        <DashboardNavbar />

        <main className="px-5 py-5 overflow-y-auto custom-scrollbar">
          {!editJobId && !editCompanyProfile && sidebarMenu === "dashboard" && <CompanyDashboard />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "add-job" && <CompanyAddJob />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "my-jobs" && <CompanyJobs />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "applications" && <CompanyApplications />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "profile" && <CompanyProfile />}
          {editCompanyProfile && <CompanyProfileForm />}
          {editJobId && <EditJob />}
        </main>

      </div>
    </div>
  )
}

export default MainScreen
