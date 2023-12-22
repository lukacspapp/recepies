import AnimatedDescription from '@/components/AnimatedDescription'
import CategoryCard from '@/components/CategoryCard'
import { Database } from '@/types/supabase'
import { CategoryTable } from '@/types/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function page() {

  const supabase = createServerComponentClient<Database>({ cookies })

  let { data: categoryList, error } = await supabase
    .from('meal_categories')
    .select('*')

  if (error) throw new Error(error.message)

  const categories = categoryList ? categoryList : []


  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription title={"Categories"} description={"Browse by Category"} />
          <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5">
            {categories.map((category: CategoryTable) => (
              <CategoryCard
                id={category.id}
                key={category.id}
                name={category.title}
                image={category.image}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

