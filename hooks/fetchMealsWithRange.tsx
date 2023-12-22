import { Database } from '@/types/supabase'
import { Meal } from '@/types/types'
import { SupabaseClient } from '@supabase/supabase-js'

export default async function fetchMealsWithIds(
  mealIds: string[],
  supabase: SupabaseClient<Database>,
): Promise<Meal[]> {

  let { data: meals, error: mealsError } = await supabase
    .from('meals')
    .select("*")
    .in('id', [mealIds])

  if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

  const mealList = meals?.map((meal: any) => ({
    ...meal,
    creator_id: meal.creator_id || "",
  }))

  return mealList || []
}