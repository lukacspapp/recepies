
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers';
import { doRequest } from '@/lib/DoRequest';
import CategoryCard from '@/components/CategoryCard';
import AnimatedDescription from '@/components/AnimatedDescription';
import { Meal } from '@/lib/types';
import NoResult from '@/components/NoResult';

export default async function page() {

  const supabase = createServerComponentClient({ cookies })

  let likedMeals: Meal[] = []

  let { data: mealIds, error } = await supabase
    .from('liked_meals')
    .select('meal_id')

  if (mealIds) {
    const fetches = mealIds?.map((mealId: any) => {
      return doRequest('GET', `${process.env.RECEPIES_API_NAME_ID + mealId.meal_id}`)
    })

    const result = await Promise.all(fetches)

    likedMeals = result.map((res: any) => res.meals[0])
  }

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription
            title={'Welcome to your Dashboard'}
            description={"Here you can find your liked recepies"}
          />
          {likedMeals.length > 0 ?
            likedMeals.map((meal: any) => (
              <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
                <CategoryCard
                  id={meal.idMeal}
                  key={meal.idMeal}
                  name={meal.strMeal}
                  image={meal.strMealThumb}
                />
              </div>
            )) :
            <NoResult />
          }
        </div>
      </section>
    </main>
  )
}