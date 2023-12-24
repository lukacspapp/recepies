import fetchIngredientsIds from '@/hooks/fetchIngredientsIds'
import fetchMealsWithIds from '@/hooks/fetchMealsWithRange'
import fetchMealsWithSearch from '@/hooks/fetchMealsWithSearch'
import { getMeals } from '@/lib/services'
import { getOffsetEnd, pickTwoNumbers } from '@/lib/utils'
import { Database } from '@/types/supabase'
import { Meal } from '@/types/types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export interface DTO {
  search: number,
  meals: Meal[],
  likedMeals?: string[],
  offsetStart: number,
}

export async function POST(req: Request) {

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const { search, type, offsetStart, offsetEnd } = await req.json() as { search: string, type: string, offsetStart: number, offsetEnd: number };

  if (type) {

    try {

      const meals = await getMeals(supabase, type, search, offsetStart, offsetEnd)

      const responseBody: DTO = {
        offsetStart,
        search: 1,
        meals: meals
      }

      if (meals) return new Response(JSON.stringify(responseBody))

    } catch (e) {
      throw new Error(String(e))
    }

  } else if (offsetEnd && !search) {

    const { n1, n2 } = pickTwoNumbers();

    try {
      const { data: mealIdList, error } = await supabase
        .from('meals')
        .select('id')

      if (error) throw new Error(`${error.message} ${error.details}`)

      const mealIds = mealIdList?.slice(n1, getOffsetEnd(n2, mealIdList.length)).map((meal: any) => meal.id)

      const mealsFromIds = await fetchMealsWithIds(mealIds, supabase)

      const responseBody: DTO = {
        likedMeals: [],
        offsetStart: n1,
        search: 0,
        meals: mealsFromIds as Meal[] || []
      }

      return new Response(JSON.stringify(responseBody))

    } catch (e) {
      throw new Error(String(e));
    }


  } else {

    const [
      mealsFromTitle,
      mealsFromCategory,
      mealsFromCuisine,
      mealIdsFromIngredients
    ] = await Promise.all([
      fetchMealsWithSearch('title', search, supabase),
      fetchMealsWithSearch('category', search, supabase),
      fetchMealsWithSearch('cuisine', search, supabase),
      fetchIngredientsIds(search, supabase)
    ])

    const meals = [
      ...mealsFromTitle,
      ...mealsFromCategory,
      ...mealsFromCuisine,
      ...mealIdsFromIngredients
    ]


    const uniqueMealIds = meals.length > 0 ? Array.from(new Set(meals.map((meal: any) => meal.meal_id))).filter((meal: any) => meal !== undefined) : []

    const mealIds = uniqueMealIds.slice(offsetStart, getOffsetEnd(offsetEnd, uniqueMealIds.length)).map((meal: any) => meal)

    const mealsFromIds = await fetchMealsWithIds(mealIds, supabase)

    const responseBody: DTO = {
      likedMeals: [],
      offsetStart,
      search: 1,
      meals: mealsFromIds as Meal[] || []
    }

    return new Response(JSON.stringify(responseBody))
  }
}