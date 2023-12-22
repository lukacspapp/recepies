import Badge from "@/components/Badge";
import Video from "@/components/Video";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { cookies } from 'next/headers';
import { formatTitle, formatToMealDBTitle } from "@/lib/utils";
import { Database } from "@/types/supabase";
import { IngridientMeasurement } from "@/types/types";


export default async function Page({ params }: { params: { slug: string } }) {

  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: matchingMeals, error: mealsError } = await supabase
    .from('meals')
    .select('*')
    .eq('title', formatToMealDBTitle(params.slug))

  if (mealsError) throw new Error(mealsError.message)

  const meal = matchingMeals[0]

  const { data: mealIngredientsMmeasurements, error: mealIngredientsMmeasurementsError } = await supabase
    .from('meal_ingredients_measurements')
    .select("*")
    .eq('meal_id', meal.id)

  if (mealIngredientsMmeasurementsError) throw new Error(mealIngredientsMmeasurementsError.message)

  const ingredientsAndMeasurements = mealIngredientsMmeasurements?.map((item: { ingredient: string; measurement: string }, i: number) => {
    return {
      ingredient: item.ingredient,
      measurement: item.measurement
    }
  }) || []


  return (
    <section className="w-full py-4 md:py-6 lg:py-12 xl:py-24 p-6">
      <div className="container px-2 md:px-4 lg:px-6">
        <div className="grid gap-4 md:gap-6 lg:gap-10 xl:gap-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="md:space-y-4">
            <Image
              src={meal.image}
              alt={meal.image}
              width={500}
              height={500}
              className="rounded-xl mb-4"
              priority
            />
            <h2 className="leading-tighter mb-2 text-center text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              {formatTitle(meal.title)}
            </h2>
            <div className="flex mt-1 justify-center space-x-2 md:space-x-4 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              <Badge value={meal.category} type='categories' />
              <Badge value={meal.cuisine} className="ml-2" type='cuisines' />
            </div>
            <h3 className="leading-tight text-lg mt-4 font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
              Instructions
            </h3>
            <p className="max-w-[700px] mt-3 leading-[1.4rem] text-zinc-500 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              {meal.description}
            </p>
            <h3 className="leading-tight mt-4 text-md font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
              Ingredients and Measurements
            </h3>
            <ul className="list-disc list-inside mt-3 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              {ingredientsAndMeasurements.map((item: { ingredient: string, measurement: string }, i: number) => (
                <li key={i}>{item.ingredient} - {item.measurement}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:space-y-4 mt-4">
            <h2 className="leading-tighter text-lg font-bold tracking-tighter md:text-xl lg:text-2xl xl:text-3xl">
              Preparation Video
            </h2>
            <Video id={meal.video_link.split('v=')[1]} />
          </div>
        </div>
      </div>
    </section>
  )
}