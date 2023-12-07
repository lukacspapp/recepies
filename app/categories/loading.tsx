import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="w-full py-4 md:py-6 lg:py-12 xl:py-24 container">
      <div className="container px-2 md:px-4 lg:px-6">
        <div className="grid gap-4 md:gap-6 lg:gap-10 xl:gap-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="space-y-2 md:space-y-4">
            <Skeleton className="mt-2 w-full h-60 bg-gray-500" />
            <Skeleton className="mt-1 w-full h-4 bg-gray-500" />
            <Skeleton className="mt-1 w-full h-4 bg-gray-500" />
            <Skeleton className="mt-1 w-24 h-4 bg-gray-500" />
          </div>
          <div className="space-y-2 md:space-y-4">
          </div>
        </div>
      </div>
    </section>
  )
}