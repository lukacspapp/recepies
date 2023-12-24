import { Database } from "@/types/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DTO } from "../recipes/route"

export async function POST() {

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

  const { data: likedMeals, error: likedMealsError } = await supabase
    .from('liked_meals')
    .select('meal_id')

  if (likedMealsError) throw new Error(`${likedMealsError.message} ${likedMealsError.details}`)

  const mealIds = likedMeals?.map((meal: any) => meal.meal_id)

  const responseBody: DTO = {
    likedMeals: mealIds,
    offsetStart: 0,
    search: 0,
    meals: []
  }

  return new Response(JSON.stringify(responseBody))
}