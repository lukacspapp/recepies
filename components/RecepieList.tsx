'use client'

import React, { Suspense } from 'react'
import SearchBar from './SearchBar'
import { NewMeal } from '@/lib/types/types'
import RecipeCard from './RecipeCard'
import LoadingRecepieCard from './LoadingRecepieCard'
import NoResult from './NoResult'

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
  const [viewedMealsCount, setViewedMealsCount] = React.useState<number>(0)
  const fifthMealRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 5th meal is viewed, increment the counter
        setViewedMealsCount(prevCount => prevCount + 1);

          console.log('viewedMealsCount', viewedMealsCount);

      }
    });

    if (fifthMealRef.current) {
      observer.observe(fifthMealRef.current);
    }

    return () => {
      if (fifthMealRef.current) {
        observer.unobserve(fifthMealRef.current);
      }
    };
  }, []);

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
              <div key={`${meal.id}-${i}`} ref={i === 4 ? fifthMealRef : null}>
              <RecipeCard
                key={meal.id}
                id={meal.id}
                strMealThumb={meal.image}
                strMeal={meal.title}
                strCategory={meal.category}
                strArea={meal.cuisine}
                strDescription={meal.description}
              />
              </div>
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