import Badge from "@/components/Badge";
import Video from "@/components/Video";
import { doRequest } from "@/lib/DoRequest";
import { extractIngredientsAndMeasures } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { cookies } from 'next/headers';



export default async function Page({ params }: { params: { slug: string } }) {

  const supabase = createServerComponentClient({ cookies })
  const formattedMealTitle = params.slug.replace(/\b\w/g, (match) => match.toUpperCase())

  const { data: mealss, error: mealsError } = await supabase
  .from('meals')
  .select('*')
  .eq('title', formattedMealTitle)

  if (mealsError) throw new Error(mealsError.message)

  const mealsss = mealss ? mealss : []

  const { data: meal_ingredients_measurements, error } = await supabase
  .from('meal_ingredients_measurements')
  .select("*")
  .eq('meal_id', mealsss[0].id)

  const { meals } = await doRequest('GET', `${process.env.RECEPIES_API_NAME + params.slug.replace(/-/g, '_')}`);

  const { ingredients, measures } = meals ? extractIngredientsAndMeasures(meals[0]) : { ingredients: [], measures: [] };

  return (
    <section className="w-full py-4 md:py-6 lg:py-12 xl:py-24 p-6">
      <div className="container px-2 md:px-4 lg:px-6">
        <div className="grid gap-4 md:gap-6 lg:gap-10 xl:gap-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="md:space-y-4">
            <Image
              src={mealsss[0].image}
              alt={mealsss[0].image}
              width={500}
              height={500}
              className="rounded-xl mb-4"
              priority
            />
            <h2 className="leading-tighter mb-2 text-center text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              {mealsss[0].title}
            </h2>
              <div className="flex mt-1 justify-center space-x-2 md:space-x-4 text-sm md:text-base lg:text-lg dark:text-zinc-400">
                <Badge value={mealsss[0].category} type='categories' />
                <Badge value={mealsss[0].cuisine} className="ml-2" type='cuisines' />
              </div>
            <h3 className="leading-tight text-lg mt-4 font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
              Instructions
            </h3>
            <p className="max-w-[700px] mt-3 leading-[1.4rem] text-zinc-500 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              {mealsss[0].description}
            </p>
            <h3 className="leading-tight mt-4 text-md font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
              Ingredients and Measurements
            </h3>
            <ul className="list-disc list-inside mt-3 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              {/* {ingredients.length > 0 ? ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient} - {measures[index]}
                </li>
              )) : null} */}
            </ul>
          </div>
          <div className="space-y-4 md:space-y-4 mt-4">
            <h2 className="leading-tighter text-lg font-bold tracking-tighter md:text-xl lg:text-2xl xl:text-3xl">
              Preparation Video
            </h2>
            <Video id={mealsss[0].video_link.split('v=')[1]} />
          </div>
        </div>
      </div>
    </section>
  )
}