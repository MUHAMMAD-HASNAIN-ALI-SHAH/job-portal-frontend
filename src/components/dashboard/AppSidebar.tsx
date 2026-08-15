import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../../components/ui/sidebar";
import {
  LogOut,
  ChevronRight,
  FilePlus,
  User,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useSidebarStore from "../../store/useNavigationStore";

const menuItems = [
  {
    name: "Dashboard",
    navigationPath: "dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Job",
    navigationPath: "add-job",
    icon: FilePlus,
  },
  {
    name: "My Jobs",
    navigationPath: "my-jobs",
    icon: Briefcase,
  },
    {
    name: "Applications",
    navigationPath: "applications",
    icon: FilePlus,
  },
  {
    name: "My Profile",
    navigationPath: "profile",
    icon: User,
  },
];

export function AppSidebar() {
  const { user, onLogout } = useAuthStore();
  const navigate = useNavigate();
  const { sidebarMenu, setSidebarMenu } = useSidebarStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Sidebar className="h-screen border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3 justify-center text-slate-900 font-bold text-lg tracking-tight">
          <i className="ri-briefcase-line text-xl text-indigo-600" />
          Job<span className="text-indigo-600">Stack</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5">

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = sidebarMenu === item.navigationPath;

            return (
              <button
                key={item.name}
                onClick={() => setSidebarMenu(item.navigationPath as any)}
                className={`group cursor-pointer flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-700 hover:bg-slate-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-700"
                    }
                  />
                  <span>{item.name}</span>
                </div>

                <ChevronRight
                  size={16}
                  className={`transition-transform ${isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:translate-x-1"
                    }`}
                />
              </button>
            );
          })}
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 bg-slate-50/70 p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full rounded-2xl outline-none">
            <div className="flex items-center gap-3 rounded-2xl border border-transparent bg-white p-3 transition-all hover:border-slate-200 hover:shadow-sm">
              {/* <img
                src={user.picture}
                alt={user.username}
                className="h-12 w-12 rounded-full border-2 border-slate-200 object-cover"
              /> */}

              <div className="min-w-0 flex-1 text-left">
                <h3 className="truncate text-sm font-semibold text-slate-900">
                  {/* {user.username} */}
                </h3>

                <p className="truncate text-xs text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl border-slate-200"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  onLogout();
                  navigate("/login");
                }}
                className="cursor-pointer bg-red-600 text-white focus:bg-red-700 py-2 px-3"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}