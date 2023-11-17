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
      <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
        {loading ? (
          Array.from(Array(3).keys()).map((_, index) => <LoadingRecepieCard key={index} />)
        ) : mealList && mealList.length > 0 ? (
          mealList.map((meal: Meal) => (
            <RecipeCard
              key={meal.idMeal}
              strMealThumb={meal.strMealThumb}
              strMeal={meal.strMeal}
              strCategory={meal.strCategory}
              strArea={meal.strArea}
              strDescription={meal.strInstructions}
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