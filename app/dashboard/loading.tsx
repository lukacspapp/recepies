import LoadingRecepieCard from "@/components/LoadingRecepieCard";
import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <main className="w-full container">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Skeleton className=" h-20 mt-20 mb-20 bg-gray-500" />
          </div>
          <div
            className="grid gap-4 md:gap-6 lg:gap-10 xl:gap-16 md:grid-cols-1 lg:grid-cols-2"
          >
            <LoadingRecepieCard />
            <LoadingRecepieCard />
            <LoadingRecepieCard />
            <LoadingRecepieCard />
          </div>
      </section>
    </main>
  )
}