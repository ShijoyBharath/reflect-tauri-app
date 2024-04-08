import { create } from "zustand";

const useDashboardStore = create((set) => ({
  refreshDashboard: 0,
  setRefreshDashboard: (refreshDashboard) => set({ refreshDashboard }),
}));

export default useDashboardStore;
