import AnimatedDescription from '@/components/AnimatedDescription'
import CuisinesBadge from '@/components/CuisinesBadge'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function page() {

  const supabase = createServerComponentClient<Database>({ cookies })

  let { data: cuisineList, error } = await supabase
    .from('meal_cuisines')
    .select('*')

  const cuisines = cuisineList || []

  if (error) throw new Error(error.message)


  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription title={"Cuisines"} description={"Browse by Cuisines"} />
          <div className="flex flex-wrap justify-center">
            {cuisines.map((cuisine, i: number) => (
              <CuisinesBadge
                key={`${i}-cuisine`}
                cuisine={cuisine.title}
                color={i % 2 === 0 ? 'bg-orange-400' : 'bg-lime-400'}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}