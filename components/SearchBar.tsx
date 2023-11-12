'use client'

import { useEffect, useState } from 'react'
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
import { SuggestionType } from '@/lib/types'

type SearchBarProps = {
  ingredients: string[]
  categories: string[]
  areas: string[]
}

export default function SearchBar({ ingredients, categories, areas }: SearchBarProps) {

  const formSchema = z.object({ search: z.string().min(1, { message: "Search is Empty" }).max(25), type: z.string() })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      type: "",
    },
  })
  const [suggestions, setSuggestions] = useState<{ suggestion: string; type: SuggestionType; }[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let suggestionList: { suggestion: string; type: SuggestionType }[] = [];

    if (e.target.value.length === 0) {
      setSuggestions([]);
      return;
    }

    const searchValue = e.target.value.toLowerCase();

    categories.forEach((category) => {
      const categoryLowerCase = category.toLowerCase();
      if (
        categoryLowerCase.includes(searchValue) ||
        categoryLowerCase.split('').some((letter) => letter.includes(searchValue))
      ) {
        suggestionList.push({ suggestion: category, type: 'Category' });
      }
    });

    areas.forEach((area: string) => {
      const areaLowerCase = area.toLowerCase();
      if (
        areaLowerCase.includes(searchValue) ||
        areaLowerCase.split('').some((letter) => letter.includes(searchValue))
      ) {
        suggestionList.push({ suggestion: area, type: "Cuisine" });
      }
    });

    ingredients.forEach((ingredient: string) => {
      const ingredientLowerCase = ingredient.toLowerCase();
      if (
        ingredientLowerCase.includes(searchValue) ||
        ingredientLowerCase.split('').some((letter) => letter.includes(searchValue))
      ) {
        suggestionList.push({ suggestion: ingredient, type: 'Ingredient' });
      }
    });

    suggestionList = suggestionList.filter(
      (v, i, a) => a.findIndex((t) => t.suggestion === v.suggestion) === i
    );

    setSuggestions(suggestionList);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.id !== "search") {
          setSuggestions([]);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [suggestions])

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
          {suggestions.length ? (
            <div
              className="m-2 w-full absolute top-[100%] bg-gray-100 max-w-md shadow-md rounded"
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
          ) : null}
        </form>
      </Form>
    </>
  )
}