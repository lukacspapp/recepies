import { SupabaseClient } from "@supabase/supabase-js";
import { getOffsetEnd } from "./utils";


export async function getMeals(
  supabase: SupabaseClient,
  type: string,
  search: string,
  offSetStart: number,
  offSetEnd: number
) {

  if (type === 'Ingredient') {

    let { data: mealIdsFromIngredients, error: ingredientsError } = await supabase
      .from('meal_ingredients_measurements')
      .select("meal_id")
      .ilike('ingredient', `%${search}%`)

    if (ingredientsError) throw new Error(`${ingredientsError.message} ${ingredientsError.details}`)

    let mealIds = mealIdsFromIngredients ? mealIdsFromIngredients.slice(offSetStart, getOffsetEnd(offSetEnd, mealIdsFromIngredients.length)).map((meal: any) => meal.meal_id) : []

    let { data: meals, error: mealsError } = await supabase
      .from('meals')
      .select("*")
      .in('id', [mealIds])

    if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

    return meals
  } else {
    // Call all meals ID that mathes the search
    let { data: meals, error: mealsError } = await supabase
      .from('meals')
      .select("id")
      .like(type.toLocaleLowerCase(), `%${search}%`)

    if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

    const mealIds = meals ? meals.slice(offSetStart, getOffsetEnd(offSetEnd, meals?.length)).map((meal: any) => meal.id) : []

    let { data: mealsFromIds, error: mealsFromIdsError } = await supabase
      .from('meals')
      .select("*")
      .in('id', [mealIds])

    if (mealsFromIdsError) throw new Error(`${mealsFromIdsError.message} ${mealsFromIdsError.details}`)

    return mealsFromIds
  }
}