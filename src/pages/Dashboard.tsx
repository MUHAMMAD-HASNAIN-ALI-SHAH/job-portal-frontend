import { SidebarProvider } from "../components/ui/sidebar";
import MainScreen from "../components/company/MainScreen";
import { AppSidebar } from "../components/company/AppSidebar";

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
