'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
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
  const [suggestions, setSuggestions] = useState([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
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
                    placeholder="Ingridients, Meals...." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            name='submit'
            type="submit">
            <MagnifyingGlassIcon />
          </Button>
          {suggestions && (
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
        )}
        </form>
      </Form>
    </>
  )
}