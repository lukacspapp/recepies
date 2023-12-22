'use client'

import Link from 'next/link'
import React from 'react'
import { badgeVariants } from './ui/badge'
import { SuggestionType } from '@/lib/types/types'


type BadgeProps = {
  value: string
  type: SuggestionType
  className?: string
}

export default function Badge({
  value,
  type,
  className
}: BadgeProps) {

  const colors: { [key: string]: string } = {
    "categories": "bg-green-500",
    "cuisines": "bg-blue-500",
    "Ingredient": "bg-yellow-500"
  }

  return (
    <Link
      className={`${className} ml-[4px] inline-block transition-opacity hover:opacity-80 ${colors[type]} px-2 py-1 rounded-lg text-base md:text-lg${badgeVariants({ variant: 'outline' })}`}
      href={`${type}/${value.toLowerCase().replace(/ /g, '-')}`}
      style={{ fontSize: '1rem' }}
    >
      {value}
    </Link>
  )
}