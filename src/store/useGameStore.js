import { create } from 'zustand'

export const useGameStore = create((set) => ({
  score: 0,
  currentLevel: 1,
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setLevel: (level) => set({ currentLevel: level }),
}))
