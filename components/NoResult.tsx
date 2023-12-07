'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NoResult() {

  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold tracking-tighter sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl text-center mb-2">
        {`${pathname === '/dashboard'
        ? `You have not liked any meals yet`
        : 'Nothing to cook in here'}`} 😥
      </h2>
      <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 text-center mx-auto">
        {`${pathname === '/dashboard'
        ? `You can like meals from the home page`
        : 'Try to search for something else'}`
      }
      </p>
      {pathname === '/dashboard' ?
        <Link
        href="/"
        className="inline-block transition-opacity hover:opacity-80 bg-zinc-300 p-2 rounded-lg"
      >
        <span className="w-full flex items-center justify-start text-center text-zinc-700 dark:text-zinc-300 font-semibold hover:text-zinc-400 dark:hover:text-zinc-600 transition-colors duration-200">

        </span>
      </Link>
      :
      null
    }
    </div>
  )
}