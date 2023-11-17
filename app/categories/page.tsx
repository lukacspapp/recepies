import AnimatedDescription from '@/components/AnimatedDescription'
import CategoryCard from '@/components/CategoryCard'
import { doRequest } from '@/lib/DoRequest'
import { Category } from '@/lib/types'

export default async function page() {

  const { categories } = await doRequest('GET', `${process.env.RECEPIES_API_CATEGORIES_WITH_IMG}`)

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
        <AnimatedDescription title={"Categories"} description={"Browse by Category"}/>
        <div className="grid gap-10 sm:gap-12 md:gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5">
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.idCategory}
              name={category.strCategory}
              image={category.strCategoryThumb}
              description={category.strCategoryDescription}
            />
          ))}
        </div>
      </div>
    </section>
  </main>
  )
}

