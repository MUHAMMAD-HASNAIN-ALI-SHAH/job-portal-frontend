import { AppSidebar } from "../components/dashboard/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";
import MainScreen from "../components/dashboard/company/MainScreen";

const Dashboard = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <MainScreen />
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard;
