import React from 'react'

type SeggestionProps = {
  suggestion: string;
  type: string;
}

export default function Suggestion({ suggestion, type }: SeggestionProps) {

  const colors: {[key: string]: string} = {
    "Category": "text-green-500",
    "Cuisine": "text-blue-500",
    "Ingredient": "text-yellow-500"
  }

  return (
    <li
      className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer flex items-center justify-between"
    >
      {suggestion}
      <span
        className={`text-gray-400 text-xs font-normal italic ml-2 ${colors[type]}`}
      >
        {type}
      </span>
    </li>
  )
}