import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function LoadingRecepieCard() {
  return (
    <div className="space-y-2 md:space-y-4">
      <Skeleton className="mx-auto mt-2 w-full h-60 bg-gray-500" />
      <Skeleton className="mx-auto mt-1 w-full h-4 bg-gray-500" />
      <Skeleton className="mx-auto mt-1 w-full h-4 bg-gray-500" />
      <Skeleton className="mt-1 w-24 h-4 bg-gray-500" />
    </div>
  )
}