import AnimatedDescription from "@/components/AnimatedDescription"
import CategoryCard from "@/components/CategoryCard";
import { formatTitle } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export default async function page({ params }: { params: { slug: string } }) {

  const supabase = createServerComponentClient({ cookies })

  let { data: mealList, error } = await supabase
  .from('meals')
  .select('id, title, image, category')
  .eq('cuisine', params.slug.charAt(0).toUpperCase() + params.slug.slice(1))

  if (error) throw new Error(error.message)

  const meals = mealList ? mealList : []

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription
            title={params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ')}
            description={`Best Recepies from the ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ')} Cuisine` }
          />
          <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
            {meals.map((meal: any) => (
              <CategoryCard
                id={meal.id}
                key={meal.id}
                name={formatTitle(meal.title)}
                image={meal.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}