'use client'

import CategoryCard from './CategoryCard'
import { formatTitle } from '@/lib/utils'

type DashboardListProps = {
  likedMeals: any
}

export default function DashboardList({ likedMeals }: DashboardListProps) {

  return (
    <div className='grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4'>
      {likedMeals.map((meal: any) => (
          <CategoryCard
            id={meal.id}
            key={meal.id}
            name={formatTitle(meal.title)}
            image={meal.image}
          />
        ))}
    </div>
  )
}