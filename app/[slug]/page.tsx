import { Button } from "@/components/ui/button";
import { doRequest } from "@/lib/DoRequest";

export default async function Page({ params }: { params: { slug: string } }) {

  return (
    <section className="w-full py-4 md:py-6 lg:py-12 xl:py-24">
        <div className="container px-2 md:px-4 lg:px-6">
          <div className="grid gap-4 md:gap-6 lg:gap-10 xl:gap-16 md:grid-cols-1 lg:grid-cols-2">
            <div className="space-y-2 md:space-y-4">
              {/* {Image} */}
              <h2 className="leading-tighter text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                {params.slug}
              </h2>
              <p className="max-w-[700px] text-zinc-500 text-sm md:text-base lg:text-lg dark:text-zinc-400">
                Detailed description of the meal. This includes information about the ingredients, preparation process,
                and nutritional values.
              </p>
              <h3 className="leading-tight text-md font-bold tracking-tighter md:text-lg lg:text-xl xl:text-2xl">
                Ingredients and Measurements
              </h3>
              <ul className="list-disc list-inside text-sm md:text-base lg:text-lg dark:text-zinc-400">
                <li>Ingredient 1 - Measurement</li>
                <li>Ingredient 2 - Measurement</li>
                <li>Ingredient 3 - Measurement</li>
                <li>Ingredient 4 - Measurement</li>
              </ul>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h2 className="leading-tighter text-lg font-bold tracking-tighter md:text-xl lg:text-2xl xl:text-3xl">
                Preparation Video
              </h2>
              <div className="relative pt-[56.25%]">
                {/* {Video} */}
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}