import React from 'react'
import { Input } from './ui/input'

export default function SearchBar() {
  return (
    <Input
    aria-label="Search"
    className="w-10/12 max-w-md px-2 md:px-4 py-5 md:py-5 border border-gray-300 mb-5 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Search By Ingridients, Cuisine or Calories"
    type="search"
  />
  )
}