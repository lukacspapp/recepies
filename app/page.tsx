import AnimatedDescription from "@/components/AnimatedDescription";
import RecepieList from "@/components/RecepieList";
import { doRequest } from "@/lib/DoRequest";

export default async function Home() {

  let ingredients: string[] = []
  let categories: string[] = []
  let areas: string[] = []

  const [
    { meals },
    { meals: ingridentsList },
    { meals: categoriesList },
    { meals: areasList }
  ] = await Promise.all([
    doRequest('GET', `${process.env.RECEPIES_API_10}`),
    doRequest('GET', `${process.env.RECEPIES_API_INGRIDIENTS_LIST}`),
    doRequest('GET', `${process.env.RECEPIES_API_CATEGORIES_LIST}`),
    doRequest('GET', `${process.env.RECEPIES_API_AREA_LIST}`)
  ])


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
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription title={"Search for Recepies"} description={"By Ingridients, Cuisine or Calories"} />
            <RecepieList
              ingredients={ingredients}
              categories={categories}
              areas={areas}
              meals={meals}
            />
        </div>
      </section>
    </main>
  )
}