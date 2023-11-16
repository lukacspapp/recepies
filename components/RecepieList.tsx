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
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16">
        {loading ? (
          Array.from(Array(3).keys()).map((_, index) => <LoadingRecepieCard key={index} />)
        ) : mealList && mealList.length > 0 ? (
          mealList.map((meal: Meal) => (
            <div key={meal.idMeal} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-8">
            <RecipeCard
              strMealThumb={meal.strMealThumb}
              strMeal={meal.strMeal}
              strCategory={meal.strCategory}
              strArea={meal.strArea}
            />
          </div>
          ))
        ) : (
          null
        )}
      </div>
      {mealList && mealList.length === 0 && !loading && <NoResult />}
    </>

  )
}