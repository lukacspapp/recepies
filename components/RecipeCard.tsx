'use client'

import { serializeSlug } from '@/lib/slugFormatter'
import Image from 'next/image'
import Link from 'next/link'

type RecepieCardPorps = {
  strMealThumb: string,
  strMeal: string,
}

export default function RecepieCard({
  strMealThumb,
  strMeal,
}: RecepieCardPorps) {

  return (
    <div className="space-y-2 md:space-y-4">
      <Image
        alt={strMealThumb}
        className="mx-auto aspect-content overflow-hidden rounded-xl object-cover object-center w-full"
        height="200"
        src={strMealThumb}
        width="300"
        priority
      />
      <h2 className="leading-tighter text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
        {strMeal}
      </h2>
      <p className="max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
        Brief description of the blog post. This is just a summary to give readers an idea of what the post is
        about.
      </p>
      <Link
        className="text-base font-medium leading-6 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400"
        href={`/${serializeSlug(strMeal)}`}
      >
        Read More
      </Link>
    </div>
  )
}