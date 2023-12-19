import { getMeals } from '@/lib/services'
import { pickTwoNumbers } from '@/lib/utils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: Request) {

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { search, type, offsetStart, offsetEnd } = await req.json() as { search: string, type: string, offsetStart: number, offsetEnd: number };

  if (type) {

    try {

      const meals = await getMeals(supabase, type, search, offsetStart, offsetEnd)

      if (meals) return new Response(JSON.stringify(meals))

    } catch (e) {
      throw new Error(String(e))
    }

  } else if (offsetEnd && !search) {

    // when the user is om the homa page scrolling through meals

    const { n1, n2 } = pickTwoNumbers();

    try {
      const { data: meals, error } = await supabase
        .from('meals')
        .select('*')
        .range(n1, n2);

      if (error) throw new Error(`${error.message} ${error.details}`)

      return new Response(JSON.stringify(meals))

    } catch (e) {
      throw new Error(String(e));
    }


  } else {
    // let { data: mealsFromTitle, error: titleError } = await supabase
    // .from('meals')
    // .select("*")
    // .ilike('title', `%${search}%`)
    // .range(offsetStart, offsetEnd)

    // let { data: mealsFromCategory, error: categoryError } = await supabase
    // .from('meals')
    // .select("*")
    // .ilike('category', `%${search}%`)
    // .range(offsetStart, offsetEnd)

    // let { data: mealsFromCuisine, error: cuisineError } = await supabase
    // .from('meals')
    // .select("*")
    // .ilike('cuisine', `%${search}%`)
    // .range(offsetStart, offsetEnd)

    // let { data: mealIdsFromIngredients, error: ingredientsError } = await supabase
    // .from('meal_ingredients_measurements')
    // .select("meal_id")
    // .ilike('ingredient', `%${search}%`)
    // .range(offsetStart, offsetEnd)
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


// ! when you fetch you need to know what is it a searched item then you need to remove the randomly searched meals and you need to put the search meals in the array then the rest of the items when you scroll down will go to the end of the array
