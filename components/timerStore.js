import { create } from "zustand";

const useTimerStore = create((set) => ({
  refreshTimer: 0,
  setRefreshTimer: (refreshTimer) => set({ refreshTimer }),
}));

export default useTimerStore;
