import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';
import AnimatedDescription from '@/components/AnimatedDescription';
import DashboardList from '@/components/DashboardList';
import { redirect } from 'next/navigation';
import NoResult from '@/components/NoResult';
import { Database } from '@/types/supabase';

export default async function page() {


  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login')

  let likedMeals: any[] = []

  let { data: mealIdList, error } = await supabase
    .from('liked_meals')
    .select('meal_id')

  if (error) throw new Error(error.message)

  const mealIds = mealIdList ? mealIdList?.map((mealId: any) => mealId.meal_id) : []

  if (mealIds.length > 0) {
    let { data: liked_meals, error } = await supabase
      .from('meals')
      .select("*")
      .in('id', [mealIds])

    if (error) throw new Error(error.message)

    likedMeals = liked_meals || []
  }

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription
            title={'Welcome to your Dashboard'}
            description={"Here you can find your liked recipes"}
          />
          {likedMeals.length > 0 ?
            <DashboardList likedMeals={likedMeals} />
            :
            <NoResult />}
        </div>
      </section>
    </main>
  )
}