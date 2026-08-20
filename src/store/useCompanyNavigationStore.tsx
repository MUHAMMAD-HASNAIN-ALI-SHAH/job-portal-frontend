import { create } from "zustand";

interface CompanyNavigationState {
    // Menu
    sidebarMenu: "dashboard" | "add-job" | "my-jobs" | "profile" | "applications";
    editJobId: string | null;
    editCompanyProfile: boolean;
    applicationJobId: string | null;

    // Setters
    setSidebarMenu: (sidebarMenu: "dashboard" | "add-job" | "my-jobs" | "profile" | "applications") => void;
    setEditJobId: (editJobId: string | null) => void;
    setEditCompanyProfile: (editCompanyProfile: boolean) => void;
    setApplicationJobId: (applicationJobId: string | null) => void;
}

const useCompanyNavigationStore = create<CompanyNavigationState>((set) => ({
    sidebarMenu: "dashboard",
    editJobId: null,
    editCompanyProfile: false,
    applicationJobId: null,

    setSidebarMenu: (sidebarMenu) => set({ sidebarMenu, editJobId: null, editCompanyProfile: false }),
    setEditJobId: (editJobId) => set({ editJobId }),
    setEditCompanyProfile: (editCompanyProfile) => set({ editCompanyProfile }),
    setApplicationJobId: (applicationJobId) => set({ applicationJobId }),
}));

export default useCompanyNavigationStore;
