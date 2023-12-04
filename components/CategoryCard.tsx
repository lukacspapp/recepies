'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HeartCheckbox from './HeartCheckBox'
import { Button } from './ui/button'
import { useAuth } from '@/context/Auth'
import HeartModal from './HeartModal'

type CategoryCardProps = {
  id: string
  name: string
  image: string
  description?: string
}

export default function CategoryCard({ id, name, image, description = '' }: CategoryCardProps) {

  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div
      className={`space-y-2 p-4 bg-white shadow-lg rounded-xl ${!description ? '' : 'transform cursor-pointer  transition-transform hover:scale-105'} `}
      onClick={description ? () => window.location.href = `${pathname === '/categories' ? '/categories/' : '/'}${name.toLowerCase().replace(/ /g, '-')}` : undefined}
    >
      <div className="flex flex-col h-full justify-between">
        <Image
          alt={name}
          className="mx-auto aspect-content object-cover object-center w-full rounded-lg"
          height={200}
          src={image}
          width={300}
        />
        <div>

          <h2 className="leading-tighter mb-3 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
            {name}
          </h2>
          {description && <div className="relative h-[6rem] overflow-hidden">
            <p className="absolute top-0 left-0 max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
              {description}
            </p>
            <div className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-white dark:from-zinc-800" />
          </div>}
          {description ?
            <Link
              className="w-full flex items-center justify-start text-center text-zinc-700 dark:text-zinc-300 font-semibold hover:text-zinc-400 dark:hover:text-zinc-600 transition-colors duration-200"
              href={`${pathname === '/categories' ? '/categories/' : '/'}${name.toLowerCase().replace(/ /g, '-')}`}
            >
              Read More
            </Link> : (
              <div
                className="flex justify-between items-center"
              >
                <Button
                  className="inline-block  transition-opacity hover:opacity-80 bg-zinc-300 p-2 rounded-lg"
                  variant="outline"
                  type="button"
                  name="read-more"
                >
                  <Link
                    className="w-full flex items-center justify-start text-center text-zinc-700 dark:text-zinc-300 font-semibold hover:text-zinc-400 dark:hover:text-zinc-600 transition-colors duration-200"
                    href={`/${name.toLowerCase().replace(/ /g, '-')}`}
                  >
                    Read More
                  </Link>
                </Button>
                {!user ?
                  <HeartModal />
                  :
                  <HeartCheckbox mealId={id} />
                }
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
