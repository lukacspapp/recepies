
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers';
import { doRequest } from '@/lib/DoRequest';
import CategoryCard from '@/components/CategoryCard';
import AnimatedDescription from '@/components/AnimatedDescription';
import RecepieList from '@/components/RecepieList';
import HeartCheckbox from '@/components/HeartCheckBox';

export default async function page() {

  const supabase = createServerComponentClient({ cookies })



  const {meals} =  await doRequest('GET', `${process.env.RECEPIES_API_10}`)

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription
            title={'Welcome to your Dashboard'}
            description={"Here you can find your liked recepies"}
          />
          <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
            {meals.map((meal: any) => (
              <CategoryCard
                id={meal.idMeal}
                key={meal.idMeal}
                name={meal.strMeal}
                image={meal.strMealThumb}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}