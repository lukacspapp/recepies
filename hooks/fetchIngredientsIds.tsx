import { Database } from '@/types/supabase'
import { Meal } from '@/types/types'
import { SupabaseClient } from '@supabase/supabase-js'

export default async function fetchIngredientsIds(
  search: string,
  supabase: SupabaseClient<Database>,
): Promise<Meal[]> {


  let { data: mealIds, error: mealIdsError } = await supabase
  .from('meal_ingredients_measurements')
  .select("meal_id")
  .ilike('ingredient', `%${search}%`)


  if (mealIdsError) throw new Error(`${mealIdsError.message} ${mealIdsError.details}`)

  const mealList = mealIds?.map((meal: any) => ({
    ...meal,
    creator_id: meal.creator_id || "",
  }))

  return mealList || []
}