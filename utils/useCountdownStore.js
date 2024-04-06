import { create } from 'zustand'

const timerStore = create((set) => ({
  timer: 0,
  setTimer: (time) => set((state) => ({ timer: time })),
}))


export default timerStore