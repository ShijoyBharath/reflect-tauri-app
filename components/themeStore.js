import {create} from 'zustand';

const useThemeStore = create((set) => ({
  theme: "light",
  // setGlobalTheme: (theme) => set({ theme }),
  setGlobalTheme: (theme) => set(() => ({ theme: theme })),
}));

export default useThemeStore;
