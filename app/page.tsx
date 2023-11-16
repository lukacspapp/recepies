import RecepieList from "@/components/RecepieList";
import { doRequest } from "@/lib/DoRequest";

export default async function Home() {

  let ingredients: string[] = []
  let categories: string[] = []
  let areas: string[] = []

  const { meals } = await doRequest('GET', `${process.env.RECEPIES_API_10}`)

  const { meals: ingridentsList } =  await doRequest('GET', `${process.env.RECEPIES_API_INGRIDIENTS_LIST}`)
  const { meals: categoriesList } =  await doRequest('GET', `${process.env.RECEPIES_API_CATEGORIES_LIST}`)
  const { meals: areasList } =  await doRequest('GET', `${process.env.RECEPIES_API_AREA_LIST}`)

  if (ingridentsList) {
    ingredients = ingridentsList.map((ingridient: any) => ingridient.strIngredient)
  }

  if (categoriesList) {
    categories = categoriesList.map((category: any) => category.strCategory)
  }

  if (areasList) {
    areas = areasList.map((area: any) => area.strArea)
  }

  return (
    <section className="w-full container flex justify-center py-12 md:py-24 lg:py-32">
      <div className="mx-auto px-4 md:px-6">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-center mb-2">
          Search For Recipes
        </h1>
        <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 text-center mx-auto">
          By Ingridients, Cuisine or Calories
        </p>
        <RecepieList
          ingredients={ingredients}
          categories={categories}
          areas={areas}
          meals={meals}
        />
      </div>
    </section>
  )
}
