'use client'

import React from 'react'
import SearchBar from './SearchBar'
import { Meal } from '@/lib/types'
import RecipeCard from './RecipeCard'
import LoadingRecepieCard from './LoadingRecepieCard'
import NoResult from './NoResult'

type RecepieListProps = {
  ingredients: string[]
  categories: string[]
  areas: string[]
  meals: Meal[]
}

export default function RecepieList({
  ingredients,
  categories,
  areas,
  meals
}: RecepieListProps) {

  const [mealList, setMealList] = React.useState<Meal[]>(meals)
  const [loading, setLoading] = React.useState<boolean>(false)

  return (
    <>
      <div className="flex justify-center m-7 md:my-8">
        <SearchBar
          ingredients={ingredients}
          categories={categories}
          areas={areas}
          setMealList={setMealList}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <div className="grid gap-6 md:gap-10 sm:px-2 md:px-10 lg:gap-16 md:grid-cols-1 lg:grid-cols-2">
        {loading ? (
          Array.from(Array(3).keys()).map((_, index) => <LoadingRecepieCard key={index} />)
        ) : mealList && mealList.length > 0 ? (
          mealList.map((meal: Meal) => (
            <RecipeCard
              key={meal.idMeal}
              strMealThumb={meal.strMealThumb}
              strMeal={meal.strMeal}
            />
          ))
        ) : (
          null
        )}
      </div>
      {mealList && mealList.length === 0 && !loading && <NoResult />}
    </>

  )
}