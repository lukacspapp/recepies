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
import { Meal, SuggestionType } from '@/lib/types'
import { Loader2 } from 'lucide-react'

type SearchBarProps = {
  ingredients: string[]
  categories: string[]
  areas: string[]
  setMealList: React.Dispatch<React.SetStateAction<Meal[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBar({
  ingredients,
  categories,
  areas,
  setMealList,
  setLoading
}: SearchBarProps) {

  const formSchema = z.object({ search: z.string().min(1, { message: "Search is Empty" }).max(25), type: z.string() })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      type: "",
    },
  })
  const [suggestions, setSuggestions] = useState<{ suggestion: string; type: string; }[]>([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let suggestionList: { suggestion: string; type: string }[] = [];

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

    const matchedSuggestion = suggestionList.find(
      (suggestion) => suggestion.suggestion.toLowerCase() === searchValue
    );

    if (matchedSuggestion) {
      form.setValue('type', matchedSuggestion.type);
    } else {
      form.setValue('type', '');
    }
    setSuggestions(suggestionList);
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSuggestions([])
    setLoading(true)
    const res = fetch('/api/recepies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    }).catch(error => {
      console.error('Error:', error);
    });

    const meals = await res;
    setMealList(meals)
    setLoading(false)
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
          className="flex items-end justify-center space-y-1 space-x-1 relative w-80"
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
                    disabled={form.formState.isSubmitting}
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
            disabled={form.formState.isSubmitting}
            name='submit'
            type="submit"
          >
            {form.formState.isSubmitting
              ?
              <Loader2
                size={15}
                className='animate-spin'
              />
              :
              <MagnifyingGlassIcon />}
          </Button>
          {suggestions.length ? (
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
          ) : null}
        </form>
      </Form>
    </>
  )
}
