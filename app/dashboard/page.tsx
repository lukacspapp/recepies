import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import { doRequest } from '@/lib/DoRequest';
import AnimatedDescription from '@/components/AnimatedDescription';
import { Meal } from '@/lib/types/types';
import DashboardList from '@/components/DashboardList';
import { redirect } from 'next/navigation';

export default async function page() {


  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login')

  let likedMeals: Meal[] = []

  let { data: mealIds, error } = await supabase
    .from('liked_meals')
    .select('meal_id')

  if (mealIds) {
    const fetches = mealIds?.map((mealId: any) => {
      return doRequest('GET', `${process.env.RECEPIES_API_NAME_ID + mealId.meal_id}`)
    })

    const result: Meal[] = await Promise.all(fetches)

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
            <DashboardList likedMeals={likedMeals} />
        </div>
      </section>
    </main>
  )
}