import {create} from 'zustand';

const useThemeStore = create((set) => ({
  theme: "light",
  setGlobalTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
