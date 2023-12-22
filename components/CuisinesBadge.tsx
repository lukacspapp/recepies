'use client'

import { cuisineList } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'

type CuisinesBadgeProps = {
  cuisine: string
  color: string
}

export default function CuisinesBadge({
  cuisine,
  color
}: CuisinesBadgeProps) {

  return (
    <Link
      className={`m-2 text-lg font-semibold px-4 py-2  text-gray-700 ${color} transform transition-transform hover:scale-105  dark:text-gray-200 rounded-full`}
      href={`/cuisines/${cuisine.toLocaleLowerCase()}`}
    >
      {cuisineList[cuisine] && cuisineList[cuisine]} {cuisine}
    </Link>
  )
}