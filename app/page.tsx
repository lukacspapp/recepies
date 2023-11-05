import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";



export default function Home() {

  return (
    <section className="body w-full py-6 md:py-12 lg:py-24">
          <div className="container px-2 md:px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-center mb-2">
              Search For Recepies
            </h1>
            <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 text-center mx-auto">
              By Ingridients, Cuisine or Calories
            </p>
            <div className="flex justify-center my-4 md:my-8">
              <SearchBar />
            </div>
            <div className="grid gap-6 md:gap-10 sm:px-2 md:px-10 lg:gap-16 md:grid-cols-1 lg:grid-cols-2">
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </div>
          </div>
        </section>
  )
}
