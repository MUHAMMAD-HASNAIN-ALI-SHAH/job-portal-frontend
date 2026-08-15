import { create } from "zustand";

interface NavigationState {
    // Menu
    sidebarMenu: "dashboard" | "add-job" | "my-jobs" | "profile" | "applications";
    editJobId: string | null;
    editCompanyProfile: boolean;

    // Setters
    setSidebarMenu: (sidebarMenu: "dashboard" | "add-job" | "my-jobs" | "profile" | "applications") => void;
    setEditJobId: (editJobId: string | null) => void;
    setEditCompanyProfile: (editCompanyProfile: boolean) => void;
}

const useNavigationStore = create<NavigationState>((set) => ({
    sidebarMenu: "dashboard",
    editJobId: null,
    editCompanyProfile: false,

    setSidebarMenu: (sidebarMenu) => set({ sidebarMenu, editJobId: null, editCompanyProfile: false }),
    setEditJobId: (editJobId) => set({ editJobId }),
    setEditCompanyProfile: (editCompanyProfile) => set({ editCompanyProfile }),
}));

export default useNavigationStore;
