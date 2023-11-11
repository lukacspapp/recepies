import React from 'react'
import { UseFormSetValue } from 'react-hook-form';

type SeggestionProps = {
  suggestion: string;
  type: string;
  setValue: UseFormSetValue<{ search: string; }>
}

export default function Suggestion({ suggestion, type, setValue }: SeggestionProps) {

  const colors: {[key: string]: string} = {
    "Category": "text-green-500",
    "Cuisine": "text-blue-500",
    "Ingredient": "text-yellow-500"
  }

  return (
    <li
      className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer flex items-center justify-between"
      onClick={() => setValue('search', suggestion)}
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