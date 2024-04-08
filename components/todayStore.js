import {create} from 'zustand';

const useTodayStore = create((set) => ({
  // today: new Date,
  todayGlobal: new Date("2024-04-11"),
  setTodayGlobal: (todayGlobal) => set({ todayGlobal }),
}));

export default useTodayStore;
