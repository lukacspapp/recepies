'use client'

import React, { Suspense, useState } from 'react'
import SearchBar from './SearchBar'
import RecipeCard from './RecipeCard'
import LoadingRecepieCard from './LoadingRecepieCard'
import NoResult from './NoResult'
import { useInView } from 'react-intersection-observer'
import { Spinner } from "@nextui-org/react";
import { formatTitle } from '@/lib/utils'
import { Meal } from '@/types/types'

type RecepieListProps = {
  ingredients: string[]
  categories: string[]
  cuisines: string[]
  meals: Meal[]
}

export default function RecepieList({
  ingredients,
  categories,
  cuisines,
  meals,
}: RecepieListProps) {

  const [mealList, setMealList] = useState<Meal[]>(meals)
  const [loading, setLoading] = useState<boolean>(false)
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false)
  const { ref, inView } = useInView({ triggerOnce: true })


  return (
    <>
      <div className='flex justify-center my-8 max-w-3xl mx-auto'>
        <SearchBar
          setPaginationLoading={setPaginationLoading}
          inView={inView}
          ingredients={ingredients}
          categories={categories}
          cuisines={cuisines}
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
            mealList.map((meal: Meal, i: number) => (
              <RecipeCard
                inViewRef={ref}
                i={i}
                key={meal.id}
                id={meal.id}
                image={meal.image}
                title={formatTitle(meal.title)}
                category={meal.category}
                cuisine={meal.cuisine}
                description={meal.description}
              />
            ))
          ) : (
            null
          )}
        </div>
        {paginationLoading && <div className='flex justify-center my-5'><Spinner size='lg' color='success' /></div>}
      </Suspense>
      {mealList && mealList.length === 0 && !loading && <NoResult />}
    </>

  )
}