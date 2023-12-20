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
      .order('title', { ascending: true })

    if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

    return meals
  }

  // Call all meals ID that mathes the search
  let { data: meals, error: mealsError } = await supabase
    .from('meals')
    .select("id")
    .like(type.toLocaleLowerCase(), `%${search}%`)

  if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)


  console.log(meals?.length);

  // console.log(offSetStart, offSetEnd);

  // const num = getOffsetEnd(offSetEnd, meals?.length)
// console.log(meals?.length);

  // console.log(offSetStart,num);

  // loop over the meals and slice with the offsetStart and Offset End
  const mealList = meals?.slice(offSetStart, getOffsetEnd(offSetEnd, meals?.length)).map((meal: any) => meal.id)

  // Call all meals that match the mealList
  let { data: mealsFromIds, error: mealsFromIdsError } = await supabase
    .from('meals')
    .select("*")
    .in('id', [mealList])



  if (mealsFromIdsError) throw new Error(`${mealsFromIdsError.message} ${mealsFromIdsError.details}`)

  return mealsFromIds
}