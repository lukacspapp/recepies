import AnimatedDescription from "@/components/AnimatedDescription";
import RecepieList from "@/components/RecepieList";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { pickTwoNumbers } from "@/lib/utils";
import { Database } from "@/types/supabase";
import { Meal } from "@/types/types";

export default async function Home() {

  const supabase = createServerComponentClient<Database>({ cookies })

  let mealList: Meal[] = []
  let ingredients: string[] = []
  let categories: string[] = []
  let areas: string[] = []

  const { n1, n2 } = pickTwoNumbers()

  const [
    { data: meals, error: mealsError },
    { data: meal_cuisines, error: cuisineError },
    { data: meal_categories, error: categoryError },
    { data: meal_ingridients, error: ingridientsError }
  ] = await Promise.all([
    supabase.from('meals').select('*').range(n1, n2),
    supabase.from('meal_cuisines').select('*'),
    supabase.from('meal_categories').select('*'),
    supabase.from('meal_ingridients').select('*')
  ])

  if (meal_ingridients && !ingridientsError) {
    ingredients = meal_ingridients.map((ingridient: any) => ingridient.title)
  }

  if (meal_categories && !categoryError) {
    categories = meal_categories.map((category: any) => category.title)
  }

  if (meal_cuisines && !cuisineError) {
    areas = meal_cuisines.map((area: any) => area.title)
  }

  if (meals && !mealsError) {
    mealList = meals.map((meal: any) => ({
      ...meal,
      creator_id: meal.creator_id || "",
    }));
  }

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription title={"Search for Recipes"} description={"By Ingredients or Cuisine"} />
          <RecepieList
            meals={mealList}
            ingredients={ingredients}
            categories={categories}
            cuisines={areas}
          />
        </div>
      </section>
    </main>
  )
}