'use client'

import Link from 'next/link'
import React from 'react'
import { badgeVariants } from './ui/badge'


type BadgeProps = {
  value: string
  type: "Category" | "Cuisine" | "Ingredient"
}

export default function Badge({ value, type }: BadgeProps) {

  const colors: { [key: string]: string } = {
    "Category": "bg-green-500",
    "Cuisine": "bg-blue-500",
    "Ingredient": "bg-yellow-500"
  }

  return (
    <Link
      className={`inline-block transition-opacity hover:opacity-80 ${colors[type]} px-2 py-1 rounded-lg text-base md:text-lg${badgeVariants({ variant: 'outline' })}`}
      href={`#`}
      style={{ fontSize: '1rem' }}
    >
      {value}
    </Link>
  )
}