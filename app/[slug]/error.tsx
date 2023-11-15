'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold tracking-tighter sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl text-center mb-2">
        Something Went Wrong 😥
      </h2>
      <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 text-center mx-auto">
        Try another refresh
      </p>
      <Button
        className="inline-block transition-opacity hover:opacity-80 bg-zinc-300 p-2 rounded-lg"
        onClick={
          () => window.location.replace('/')
        }
        variant="outline"
      >
        Refresh
      </Button>
    </div>
  )
}