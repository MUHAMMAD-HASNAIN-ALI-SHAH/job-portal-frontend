import useNavigationStore from "../../store/useNavigationStore"
import CompanyAddJob from "./company/CompanyAddJob"
import CompanyDashboard from "./company/CompanyDashboard"
import CompanyJobs from "./company/CompanyJobs"
import CompanyProfileForm from "./company/ui/CompanyProfileForm"
import EditJob from "./company/ui/EditJob"
import DashboardNavbar from "./DashboardNavbar"
import CompanyProfile from "./company/CompanyProfile"
import Applications from "./company/CompanyApplications"

const MainScreen = () => {
  const { sidebarMenu, editJobId, editCompanyProfile } = useNavigationStore()
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <div className="flex h-full w-full flex-col">
        <DashboardNavbar />

        <main className="px-5 py-5 overflow-y-auto custom-scrollbar">
          {!editJobId && !editCompanyProfile && sidebarMenu === "dashboard" && <CompanyDashboard />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "add-job" && <CompanyAddJob />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "my-jobs" && <CompanyJobs />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "profile" && <CompanyProfile />}
          {!editJobId && !editCompanyProfile && sidebarMenu === "applications" && <Applications />}
          {editCompanyProfile && <CompanyProfileForm />}
          {editJobId && <EditJob />}
        </main>

      </div>
    </div>
  )
}

export default MainScreen
