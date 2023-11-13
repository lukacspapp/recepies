import React from 'react'

export default function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold tracking-tighter sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl text-center mb-2">
        Nothing to cook in here 😥
      </h2>
      <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400 text-center mx-auto">
        Try another search
      </p>
    </div>
  )
}