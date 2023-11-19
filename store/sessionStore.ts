import { create } from 'zustand'

export const useSessionStore = create((set) => ({
  session: null,
  setSession: (session: any) => set({ session }),
}))
