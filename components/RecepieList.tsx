'use client'

import React, { Suspense } from 'react'
import SearchBar from './SearchBar'
import { NewMeal } from '@/lib/types/types'
import RecipeCard from './RecipeCard'
import LoadingRecepieCard from './LoadingRecepieCard'
import NoResult from './NoResult'
import { useInView } from 'react-intersection-observer'

type RecepieListProps = {
  ingredients: string[]
  categories: string[]
  areas: string[]
  meals: NewMeal[]
}

export default function RecepieList({
  ingredients,
  categories,
  areas,
  meals,
}: RecepieListProps) {

  const [mealList, setMealList] = React.useState<NewMeal[]>(meals)
  const [loading, setLoading] = React.useState<boolean>(false)

  return (
    <>
      <div className='flex justify-center my-8 max-w-3xl mx-auto'>
        <SearchBar
          ingredients={ingredients}
          categories={categories}
          areas={areas}
          setMealList={setMealList}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <Suspense fallback={<LoadingRecepieCard />}>
        <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
          {loading ? (
            Array.from(Array(3).keys()).map((_, index) => <LoadingRecepieCard key={index} />)
          ) : mealList && mealList.length > 0 ? (
            mealList.map((meal: NewMeal, i: number) => (
              <RecipeCard
                i={i}
                key={meal.id}
                id={meal.id}
                strMealThumb={meal.image}
                strMeal={meal.title}
                strCategory={meal.category}
                strArea={meal.cuisine}
                strDescription={meal.description}
              />
            ))
          ) : (
            null
          )}
        </div>
      </Suspense>
      {mealList && mealList.length === 0 && !loading && <NoResult />}
    </>

  )
}