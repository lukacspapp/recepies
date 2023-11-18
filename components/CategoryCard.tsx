'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type CategoryCardProps = {
  name: string
  image: string
  description?: string
}

export default function CategoryCard({ name, image, description = '' }: CategoryCardProps) {

  const pathname = usePathname()

  return (
    <div
      className="cursor-pointer space-y-2 p-4 bg-white shadow-lg rounded-xl transform transition-transform hover:scale-105"
      onClick={() => {
        window.location.href = `${pathname === '/categories' ? '/categories/' : '/'}${name.toLowerCase().replace(/ /g, '-')}`
      }}
    >
      <div className="rounded-xl overflow-hidden">
        <Image
          alt={name}
          className="mx-auto aspect-content object-cover object-center w-full"
          height={200}
          src={image}
          width={300}
        />
        <h2 className="leading-tighter text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
          {name}
        </h2>
        {description && <div className="relative h-[6rem] overflow-hidden">
          <p className="absolute top-0 left-0 max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
            {description}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-white dark:from-zinc-800" />
        </div>}
        {description && <Link
          className="w-full flex items-center justify-start text-center text-zinc-700 dark:text-zinc-300 font-semibold hover:text-zinc-400 dark:hover:text-zinc-600 transition-colors duration-200"
          href={`/${name.toLowerCase().replace(/ /g, '-')}`}
        >
          Read More
        </Link>}
      </div>
    </div>
  )
}
