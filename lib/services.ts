import { SupabaseClient } from "@supabase/supabase-js";
import { SearchType } from "./types/types";


export async function getMeals(
  supabase: SupabaseClient,
  type: string,
  search: string,
  offSetStart: number,
  offSetEnd: number
) {

  if (type === 'Ingredient') {

    let { data: mealIdsFromIngredients, error: ingredientsError } = await supabase
      .from('meal_ingredients')
      .select("meal_id")
      .like('ingredient', `%${search}%`)

    if (ingredientsError) throw new Error(`${ingredientsError.message} ${ingredientsError.details}`)

    if (!mealIdsFromIngredients) return []

    let mealIds = mealIdsFromIngredients?.map(meal => meal.meal_id)

    let { data: meals, error: mealsError } = await supabase
      .from('meals')
      .select("*")
      .in('id', mealIds)
      .range(offSetStart, offSetEnd)

    if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

    return meals
  }

  let { data: meals, error: mealsError } = await supabase
    .from('meals')
    .select("*")
    .like(type.toLocaleLowerCase(), `%${search}%`)
    .range(offSetStart, offSetEnd)


  if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

  return meals
}