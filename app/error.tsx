'use client'

import AnimatedDescription from '@/components/AnimatedDescription'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'
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
    <div className="flex m-6 flex-col items-center justify-center bg-center">
      <AnimatedDescription
        title={"Computer Says NO"}
        description={"Something went Wrong, try to refresh the page"}
      />
      <Frown className="w-32 h-32 text-red-400"/>
      <Button
        className="inline-block m-3 transition-opacity hover:opacity-80 bg-zinc-300 p-2 rounded-lg"
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