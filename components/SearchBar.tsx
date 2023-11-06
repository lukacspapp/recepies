'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export default function SearchBar() {

  const [input, setInput] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  // Countries
  // make a constany aboutb the countries sam for  the ingredients and for vegan etc.
  // if the letter is one letter that we assumed that is a suggestion what you want to search for country, ingrident or meal
  // vlaidate the any input that is constant


  return (
    <>
      <form className="flex flex-col justify-center items-center my-4 md:my-8">
        <div className="flex">
          <Input
            onChange={handleChange}
            aria-label="Search"
            className="w-full max-w-md px-2 md:px-4 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for articles..."
            type="search"
          />
          <Button
            disabled={!input}
            name='Search'
            className="ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 rounded"
            type="submit"
            aria-label='Search'
          >
            <MagnifyingGlassIcon />
          </Button>
        </div>
        {input && (
        <div className="m-2 w-full max-w-md shadow-md rounded">
          <ul aria-label="Search suggestions" className="max-h-[200px] overflow-auto">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suggestion 1</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suggestion 2</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Suggestion 3</li>
          </ul>
        </div>
        )}
      </form>
    </>
  )
}