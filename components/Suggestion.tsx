import React from 'react'

type SeggestionProps = {
  suggestion: string
}

export default function Suggestion({ suggestion }: SeggestionProps) {
  return (
    <li key={suggestion} className="px-2 py-1 hover:bg-gray-200 rounded cursor-pointer">
      {suggestion}
    </li>
  )
}