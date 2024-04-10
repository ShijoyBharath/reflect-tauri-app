import {create} from 'zustand';

const useTodayStore = create((set) => ({
  todayGlobal: new Date(),
  // todayGlobal: new Date("2024-04-16"),
  setTodayGlobal: (todayGlobal) => set({ todayGlobal }),
}));

export default useTodayStore;
