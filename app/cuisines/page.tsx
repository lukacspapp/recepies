import AnimatedDescription from '@/components/AnimatedDescription'
import CuisinesBadge from '@/components/CuisinesBadge'
import { doRequest } from '@/lib/DoRequest'

export default async function page() {

  const { meals: cuisines } = await doRequest('GET', `${process.env.RECEPIES_API_AREA_LIST}`)

  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
        <AnimatedDescription title={"Cuisines"} description={"Browse by Cuisines"}/>
          <div className="flex flex-wrap justify-center">
          {cuisines.map((cuisine: any, i: number) => (
            <CuisinesBadge
              key={`${i}-cuisine`}
              cuisine={cuisine.strArea}
              color={i % 2 === 0 ? 'bg-orange-400' : 'bg-lime-400'}
            />
          ))}
        </div>
      </div>
    </section>
  </main>
  )
}