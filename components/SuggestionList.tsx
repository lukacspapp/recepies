import { SuggestionType } from '@/lib/types/types'
import React from 'react'
import Suggestion from './Suggestion'
import { UseFormReturn } from 'react-hook-form'

type Props = {
  suggestions: { suggestion: string; type: string; }[]
  form: UseFormReturn<{ search: string; type: string; }, any, undefined>
}

export default function SuggestionList({ suggestions, form }: Props) {
  return (
    <div
      className="m-2 w-full absolute top-full bg-gray-100 max-w-md shadow-md rounded z-10"
    >
      <ul
        aria-label="Search suggestions"
        className="max-h-[200px] overflow-auto p-1"
      >
        {suggestions.map((suggestion, i) => (
          <Suggestion
            key={`${suggestion} - ${i}`}
            suggestion={suggestion.suggestion}
            type={suggestion.type}
            setValue={form.setValue}
          />
        ))}
      </ul>
    </div>
  )
}