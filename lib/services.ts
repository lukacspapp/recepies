import { SupabaseClient } from "@supabase/supabase-js";
import { getOffsetEnd } from "./utils";
import { Meal, formSchema } from "@/types/types";
import fetchMealsWithIds from "@/hooks/fetchMealsWithRange";
import { z } from "zod";
import { mealResponse } from "@/app/api/recipes/route";


export async function getMeals(
  supabase: SupabaseClient,
  type: string,
  search: string,
  offSetStart: number,
  offSetEnd: number
): Promise<Meal[]> {

  if (type === 'Ingredient') {

    let { data: mealIdsFromIngredients, error: ingredientsError } = await supabase
      .from('meal_ingredients_measurements')
      .select("meal_id")
      .ilike('ingredient', `%${search}%`)

    if (ingredientsError) throw new Error(`${ingredientsError.message} ${ingredientsError.details}`)

    let mealIds = mealIdsFromIngredients ? mealIdsFromIngredients.slice(offSetStart, getOffsetEnd(offSetEnd, mealIdsFromIngredients.length)).map((meal: any) => meal.meal_id) : []

    const meals = await fetchMealsWithIds(mealIds, supabase)

    return meals ? meals : []
  } else {

    let { data: meals, error: mealsError } = await supabase
      .from('meals')
      .select("id")
      .like(type.toLocaleLowerCase(), `%${search}%`)

    if (mealsError) throw new Error(`${mealsError.message} ${mealsError.details}`)

    const mealIds = meals ? meals.slice(offSetStart, getOffsetEnd(offSetEnd, meals?.length)).map((meal: any) => meal.id) : []

    const mealsFromIds = await fetchMealsWithIds(mealIds, supabase)

    return mealsFromIds ? mealsFromIds : []
  }
}

export async function fetchMeals(
  url: string,
  body: z.infer<typeof formSchema>
): Promise<mealResponse> {

  try {

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const responseBody = await res.json();

      return responseBody;
    }

    throw new Error(`There was an Error: ${res.statusText}`)
  } catch (e) {

    throw new Error(String(e))
  }

}