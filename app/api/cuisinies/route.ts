import { getMeals } from '@/lib/services'
import { getOffsetEnd, pickTwoNumbers } from '@/lib/utils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

let responseBody = {
  search: 0,
  meals: [] as any,
  offsetStart: 0,
}

export async function POST(req: Request) {

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { search, type, offsetStart, offsetEnd } = await req.json() as { search: string, type: string, offsetStart: number, offsetEnd: number };

  if (type) {

    try {

      const meals = await getMeals(supabase, type, search, offsetStart, offsetEnd)

      responseBody = {
        offsetStart,
        search: 1,
        meals
      }

      if (meals) return new Response(JSON.stringify(responseBody))

    } catch (e) {
      throw new Error(String(e))
    }

  } else if (offsetEnd && !search) {

    // when the user is om the hom page scrolling through meals without searching

    const { n1, n2 } = pickTwoNumbers();

    try {
      const { data: meals, error } = await supabase
        .from('meals')
        .select('id')

      if (error) throw new Error(`${error.message} ${error.details}`)

      const mealList = meals?.slice(n1, getOffsetEnd(n2, meals.length)).map((meal: any) => meal.id)

      const { data: mealsFromIds, error: mealsFromIdsError } = await supabase
        .from('meals')
        .select('*')
        .in('id', [mealList])

      if (mealsFromIdsError) throw new Error(`${mealsFromIdsError.message} ${mealsFromIdsError.details}`)

      responseBody = {
        offsetStart: n1,
        search: 0,
        meals: mealsFromIds
      }

      return new Response(JSON.stringify(responseBody))

    } catch (e) {
      throw new Error(String(e));
    }


  } else {


    let { data: mealsFromTitle, error: titleError } = await supabase
    .from('meals')
    .select("*")
    .ilike('title', `%${search}%`)

    if (titleError) throw new Error(`${titleError.message} ${titleError.details}`)

    let { data: mealsFromCategory, error: categoryError } = await supabase
    .from('meals')
    .select("*")
    .ilike('category', `%${search}%`)

    if (categoryError) throw new Error(`${categoryError.message} ${categoryError.details}`)

    let { data: mealsFromCuisine, error: cuisineError } = await supabase
    .from('meals')
    .select("*")
    .ilike('cuisine', `%${search}%`)

    if (cuisineError) throw new Error(`${cuisineError.message} ${cuisineError.details}`)

    let { data: mealIdsFromIngredients, error: ingredientsError } = await supabase
    .from('meal_ingredients_measurements')
    .select("meal_id")
    .ilike('ingredient', `%${search}%`)

    if (ingredientsError) throw new Error(`${ingredientsError.message} ${ingredientsError.details}`)

    const meals = [
      ...mealsFromTitle || [],
      ...mealsFromCategory || [],
      ...mealsFromCuisine || [],
      ...mealIdsFromIngredients || []
    ]

    if (!meals) return []

    const uniqueMealIds = Array.from(new Set(meals.map((meal: any) => meal.meal_id))).filter((meal: any) => meal !== undefined)

    const mealIds = uniqueMealIds.slice(offsetStart, getOffsetEnd(offsetEnd, uniqueMealIds.length)).map((meal: any) => meal)

    let { data: mealsFromIds, error: mealsFromIdsError } = await supabase
    .from('meals')
    .select("*")
    .in('id', [mealIds])

    if (mealsFromIdsError) throw new Error(`${mealsFromIdsError.message} ${mealsFromIdsError.details}`)

    if (!mealsFromIds) return []

    responseBody = {
      offsetStart,
      search: 1,
      meals: mealsFromIds
    }

    return new Response(JSON.stringify(responseBody))
  }
}