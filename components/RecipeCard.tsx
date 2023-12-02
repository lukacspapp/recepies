'use client'

import { serializeSlug } from '@/lib/stringFormatter'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import Badge from './Badge'
import HeartCheckbox from './HeartCheckBox'
import { useAuth } from '@/context/Auth'
import HeartModal from './HeartModal'

type RecepieCardPorps = {
  strMealThumb: string,
  strMeal: string,
  strCategory: string,
  strArea: string,
  strDescription: string
}

export default function RecepieCard({
  strMealThumb,
  strMeal,
  strCategory,
  strArea,
  strDescription
}: RecepieCardPorps) {

  const { user } = useAuth()

  return (
    <div className="px-2 sm:px-0">
      <div className="relative aspect-w-4 aspect-h-5 overflow-hidden rounded-xl">
        <Image
          alt={strMealThumb}
          className="w-full aspect-content overflow-hidden rounded-xl object-cover object-center"
          height="150"
          src={strMealThumb}
          width="200"
          priority
        />
        <div className='mt-2 overflow-hidden'>
          <h2 className="lg:leading-tighter mt-2 text-xl font-bold tracking-tighter sm:text-2xl">
            {strMeal}
          </h2>
        </div>
        <div className='mt-2 flex flex-row justify-between items-center'>
          <div>
            <Badge value={strArea} type='cuisines' />
            <Badge value={strCategory} type='categories' />
          </div>
          <div>
            {!user ?
              <HeartModal />
              :
              <HeartCheckbox />
            }
          </div>
        </div>
        <div className="relative h-16 mt-2 overflow-hidden">
          <p className="absolute top-0 left-0 max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
            {strDescription}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-white dark:from-zinc-800" />
        </div>
        <Button className="inline-block  transition-opacity hover:opacity-80 bg-zinc-300 p-2 rounded-lg" variant='outline'>
          <Link
            href={`/${serializeSlug(strMeal)}`}
          >
            Read More
          </Link>
        </Button>
      </div>
    </div>
  )
}