import RecepieList from "@/components/RecepieList";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import { doRequest } from "@/lib/DoRequest";
import { Meal } from "@/lib/types";

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
    <section className="w-full py-6 p-2 md:py-12 md:p-2 lg:py-24 lg:p-2">
      <div className="container px-2 md:px-4 lg:px-6">
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
