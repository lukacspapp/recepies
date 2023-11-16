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
      <div className="rounded-xl overflow-hidden border border-gray-300">
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
          <Badge value={strArea} type='Cuisine' />
          <Badge value={strCategory} className='ml-2' type='Category' />
        </div>
      </h2>
      <div className="relative h-[6rem] overflow-hidden">
        <p className="absolute top-0 left-0 max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, omnis voluptas ea minus et quis aliquid nesciunt dolor laborum eaque aspernatur dignissimos accusantium alias aliquam nihil quod rem quidem sit.
        </p>
        <div className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-white dark:from-zinc-800" />
      </div>
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