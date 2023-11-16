import CategoryCard from '@/components/CategoryCard'
import { doRequest } from '@/lib/DoRequest'
import { Category } from '@/lib/types'
import React from 'react'

export default async function page() {

  const { categories } = await doRequest('GET', `${process.env.RECEPIES_API_CATEGORIES_WITH_IMG}`)

  return (
    <section className="w-full flex justify-center py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-center mb-2">
          Categories
        </h1>
        <p className="max-w-[600px] mb-5 text-zinc-500 md:text-xl dark:text-zinc-400 text-center mx-auto">
          Discover Popular Categories
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16">
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.idCategory}
              name={category.strCategory}
              image={category.strCategoryThumb}
              description={category.strCategoryDescription}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

