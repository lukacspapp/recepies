import { create } from 'zustand'

export const useLikedMealStore = create((set) => ({
  likedMeals: [],
  setLikedMeals: (likedMeals: any) => set((state: any) => ({ likedMeals: [...state.likedMeals, likedMeals] })),
}))
