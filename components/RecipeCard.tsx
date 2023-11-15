'use client'

import { serializeSlug } from '@/lib/stringFormatter'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { badgeVariants } from "@/components/ui/badge"
import Badge from './Badge'

type RecepieCardPorps = {
  strMealThumb: string,
  strMeal: string,
  strCategory: string,
  strArea: string
}

export default function RecepieCard({
  strMealThumb,
  strMeal,
  strCategory,
  strArea
}: RecepieCardPorps) {

  return (
    <div className="space-y-2 md:space-y-4 p-4 bg-white shadow-lg rounded-xl">
      <div className="rounded-xl overflow-hidden border border-gray-300"> {/* Added container for the image with border */}
        <Image
          alt={strMealThumb}
          className="mx-auto aspect-content object-cover object-center w-full"
          height="200"
          src={strMealThumb}
          width="300"
          priority
        />
      </div>
      <h2 className="leading-tighter text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
        {strMeal}
        <div>
          <Link
            className={`inline-block transition-opacity hover:opacity-80 bg-green-500 px-2 py-1 rounded-lg text-base md:text-lg${badgeVariants({ variant: 'outline' })}`}
            href={`#`}
            style={{ fontSize: '1rem' }}
          >
              {strArea}
          </Link>
          <Link
            className={`inline-block transition-opacity hover:opacity-80 bg-blue-500 px-2 py-1 ml-1 rounded-lg text-base md:text-lg${badgeVariants({ variant: 'outline' })}`}
            href={`#`}
            style={{ fontSize: '1rem' }}
          >
            {strCategory}
          </Link>
        </div>
      </h2>
      <p className="max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
        <span>
          Brief description of the blog post. This is just a summary to give readers an idea of what the post is about.
        </span>
      </p>
      <Button className="inline-block transition-opacity hover:opacity-80 bg-zinc-300 p-2 rounded-lg" variant='outline'>
      <Link
        href={`/${serializeSlug(strMeal)}`}
      >
        Read More
      </Link>
      </Button>
    </div>
  )
}