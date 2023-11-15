import Badge from "@/components/Badge";
import Video from "@/components/Video";
import { Button } from "@/components/ui/button";
import { doRequest } from "@/lib/DoRequest";
import { extractIngredientsAndMeasures } from "@/lib/utils";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {

  const { meals } = await doRequest('GET', `${process.env.RECEPIES_API_NAME + params.slug.replace(/-/g, '_')}`);

  const { ingredients, measures } = extractIngredientsAndMeasures(meals[0]);

  return (
    <section className="w-full py-4 md:py-6 lg:py-12 xl:py-24">
      <div className="container px-2 md:px-4 lg:px-6">
        <div className="grid gap-4 md:gap-6 lg:gap-10 xl:gap-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="space-y-2 md:space-y-4">
            <Image
              src={meals[0].strMealThumb}
              alt={meals[0].strMeal}
              width={500}
              height={500}
              className="rounded-xl"
              priority
              placeholder="blur"
            />
            <h2 className="leading-tighter text-center text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              {meals[0].strMeal}
            </h2>
            <div className="flex justify-center space-x-2 md:space-x-4 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              <Badge value={meals[0].strCategory} type='Category' />
              <Badge value={meals[0].strArea} type='Cuisine' />
            </div>
            <h3 className="leading-tight text-lg font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
              Instructions
            </h3>
            <p className="max-w-[700px] text-zinc-500 text-sm md:text-base lg:text-lg dark:text-zinc-400">
              {meals[0].strInstructions}
            </p>
            <h3 className="leading-tight text-md font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
              Ingredients and Measurements
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base lg:text-lg dark:text-zinc-400">
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient} - {measures[index]}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 md:space-y-4">
            <h2 className="leading-tighter text-lg font-bold tracking-tighter md:text-xl lg:text-2xl xl:text-3xl">
              Preparation Video
            </h2>
            <Video id={meals[0].strYoutube.split('v=')[1]} />
          </div>
        </div>
      </div>
    </section>
  )
}