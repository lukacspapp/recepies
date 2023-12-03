import { create } from 'zustand'

export const useLikedMealStore = create((set) => ({
  likedMealIds: [],
  addToLikedMeals: (likedMeals: any) => set((state: any) => ({ likedMeals: [...state.likedMeals, likedMeals] })),
  removeFromLikedMealIds: (likedMeals: any) => set((state: any) => ({ likedMeals: state.likedMeals.filter((meal: any) => meal.idMeal !== likedMeals.idMeal)})),
  setLikedMealIds: (likedMeals: any) => set(() => ({ likedMeals })),
}))
