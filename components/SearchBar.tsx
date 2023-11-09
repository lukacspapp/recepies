'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { CATEGORIES } from '@/lib/constants'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from './ui/label'
import Suggestion from './Suggestion'

export default function SearchBar() {


  const formSchema = z.object({ search: z.string().min(1, { message: "Search is Empty" }).max(25) })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    let suggestionList : string[] = [];

    if (e.target.value.length === 0) {
      setSuggestions([])
      return
    }

    for (let i = 0; i < CATEGORIES.length; i++) {
      for (let j = 0; j < CATEGORIES[i].length; j++) {
        const letters = e.target.value.split('')
        if (
          CATEGORIES[i].toLowerCase().includes(e.target.value.toLowerCase())
          || CATEGORIES[i][j].toLowerCase().includes(e.target.value.toLowerCase())
          || CATEGORIES[i].toLowerCase().includes(letters.map((letter) => letter[0]).join(''))
        ) {
          suggestionList.push(CATEGORIES[i])
        }
      }
      suggestionList = suggestionList.filter((item, index) => suggestionList.indexOf(item) === index)

    }

    setSuggestions(suggestionList)

  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // Countries
  // make a constany aboutb the countries sam for  the ingredients and for vegan etc.
  // if the letter is one letter that we assumed that is a suggestion what you want to search for country, ingrident or meal
  // vlaidate the any input that is constant


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end justify-center space-y-1 space-x-1 relative"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="search" />
                <FormMessage className='absolute bottom-10' />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingridients, Meals...."
                    onChange={(e) => {
                      setInput(e.target.value)
                      handleChange(e)
                      field.onChange(e)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            name='submit'
            type="submit">
            <MagnifyingGlassIcon />
          </Button>
          {suggestions ? (
          <div className="m-2 w-full absolute top-[100%] bg-gray-100 max-w-md shadow-md rounded">
            <ul aria-label="Search suggestions" className="max-h-[200px] overflow-auto">
              {suggestions.map((suggestion, i) => (
                <Suggestion
                  key={`${suggestion} - ${i}`}
                  suggestion={suggestion}
                />
              ))}
            </ul>
          </div>
        ) : null}
        </form>
      </Form>
    </>
  )
}