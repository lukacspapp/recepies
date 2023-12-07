'use client'

import { Meal } from '@/lib/types'
import CategoryCard from './CategoryCard'
import NoResult from './NoResult'

type DashboardListProps = {
  likedMeals: Meal[]
}

export default function DashboardList({ likedMeals }: DashboardListProps) {

  return (
    <div className={`${likedMeals.length > 0 ? `grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4` : ''}`}>
      {likedMeals.length > 0 ?
        likedMeals.map((meal: Meal) => (
          <CategoryCard
            id={meal.idMeal}
            key={meal.idMeal}
            name={meal.strMeal}
            image={meal.strMealThumb}
          />
        )) : (
          <NoResult />
        )}
    </div>
  )
}