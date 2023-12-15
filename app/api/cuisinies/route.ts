import { getMeals } from '@/lib/services'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const apiRoutes = {
  'Category': 'category',
}

export async function POST(req: Request) {


  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { search, type, offsetStart, offsetEnd } = await req.json() as { search: string, type: string };

    const offSetStart = 0
    const offSetEnd = 9
    // const search = "Dessert"
    // const type = "Category"

  if (type) {

    try {

      const meals = await getMeals(supabase, type, search, offSetStart, offSetEnd)

      if (meals) return new Response(JSON.stringify(meals))

    } catch (e) {
      throw new Error(String(e))
    }


  } else {

    let { data: mealsFromTitle, error: titleError } = await supabase
    .from('meals')
    .select("*")
    .ilike('title', `%${search}%`)
    .range(offSetStart, offSetEnd)

    let { data: mealsFromCategory, error: categoryError } = await supabase
    .from('meals')
    .select("*")
    .ilike('category', `%${search}%`)
    .range(offSetStart, offSetEnd)

    let { data: mealsFromCuisine, error: cuisineError } = await supabase
    .from('meals')
    .select("*")
    .ilike('cuisine', `%${search}%`)
    .range(offSetStart, offSetEnd)

    let { data: mealIdsFromIngredients, error: ingredientsError } = await supabase
    .from('meal_ingredients_measurements')
    .select("meal_id")
    .ilike('ingredient', `%${search}%`)
    .range(offSetStart, offSetEnd)


  }







  // const { data, error } = await supabase
  //   .from('meal_ingredients_measurements')
  //   .select('meal_id')
  //   .like('ingredient', `%${search}%`)

  // console.log(data, error)

  // const s = Array.from(new Set(data?.map((d: any) => d.meal_id)));

  // const { data: meals, error: e } = await supabase
  //   .from('meals')
  //   .select('*')
  //   .in('id', s.slice(0, 10));

  // console.log(meals);




}



// meal_ingredients_measurements