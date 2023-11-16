'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

type CategoryCardProps = {
  name: string
  image: string
  description: string
}

export default function CategoryCard({ name, image, description }: CategoryCardProps) {
  return (
    <div className="m-2">
      <Image
        alt={name}
        className="mx-auto aspect-content overflow-hidden rounded-xl object-cover object-center w-full"
        height={500}
        src={image}
        width={500}
      />
      <h2 className="leading-tighter text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
        {name}
      </h2>
      <div className="relative h-[6rem] overflow-hidden">
        <p className="absolute top-0 left-0 max-w-[700px] text-zinc-500 md:text-lg dark:text-zinc-400">
          {description}
        </p>
        <div className="absolute bottom-0 left-0 w-full h-[5rem] bg-gradient-to-t from-white dark:from-zinc-800" />
      </div>
      {/* creata rread more link that it is not a butoon just. a word on hover higlight */}
      <Link
        className="w-full flex items-center justify-start text-center text-zinc-700 dark:text-zinc-300 font-semibold hover:text-zinc-400 dark:hover:text-zinc-600 transition-colors duration-200"
        href={`categories/${name.toLowerCase().replace(/ /g, '-')}`}
      >
        Read More
      </Link>

    </div>
  )
}
