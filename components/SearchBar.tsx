'use client'

import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Label } from './ui/label'
import { Meal, defaultFromValues, formSchema } from '@/types/types'
import { Loader2 } from 'lucide-react'
import SuggestionList from './SuggestionList'
import { fecser } from '../node_modules/fecser/dist'
import { fetcher } from '@/lib/services'


type SearchBarProps = {
  ingredients: string[]
  categories: string[]
  cuisines: string[]
  setMealList: React.Dispatch<React.SetStateAction<Meal[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  inView: boolean
  setPaginationLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchBar({
  ingredients,
  categories,
  cuisines: areas,
  setMealList,
  setLoading,
  inView,
  setPaginationLoading,
}: SearchBarProps) {

  const [suggestions, setSuggestions] = useState<{ suggestion: string; type: string; }[]>([])
  const form = useForm<z.infer<typeof formSchema>>(defaultFromValues)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.toLowerCase();
    const suggestionList: string[] = [];

    const allData = [...categories, ...areas, ...ingredients];

    allData.forEach((item: string) => {
      const itemLowerCase = item.toLowerCase();

      if (itemLowerCase.includes(searchValue) || itemLowerCase.startsWith(searchValue)) {
        suggestionList.push(item);
      }
    });

    const suggestionObjects = Array.from(suggestionList).map((suggestion) => {
      const type =
        categories.includes(suggestion) ? 'Category' :
          areas.includes(suggestion) ? 'Cuisine' :
            ingredients.includes(suggestion) ? 'Ingredient' : '';

      return { suggestion, type };
    });

    const matchedSuggestion = suggestionObjects.find(
      (suggestion) => suggestion.suggestion.toLowerCase() === searchValue
    );

    form.setValue('type', matchedSuggestion ? matchedSuggestion.type : '');
    setSuggestions(suggestionObjects);
  }

  async function setMeals(meals: Meal[]) {
    setMealList(meals)
  }

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setSuggestions([])
    setMealList([])
    setLoading(true)

    const { meals } = await fecser(
      '/api/recipes',
      {
        method: 'POST',
        body: values
      }
    ) as { meals: Meal[] };

    await setMeals(meals)

    setLoading(false)

  }

  async function handlePagination() {
    setPaginationLoading(true)

    const { meals } = await fetcher(
      'POST',
      '/api/recipes',
      form.getValues()
    )

    setMealList((prevMealList) => [...prevMealList, ...meals]);

    setPaginationLoading(false)
  }

  function handleInViewChange() {
    if (inView) {
      form.setValue('offsetStart', form.getValues('offsetEnd'));
      form.setValue('offsetEnd', form.getValues('offsetEnd') + 10);
      handlePagination();
    }
  }

  useEffect(() => {
    handleInViewChange();
  }, [inView]);

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

  useEffect(() => {
    form.setValue('offsetStart', 0);
    form.setValue('offsetEnd', 10);
  }, [form.getValues('search')]);

  return (
    <>
      <Form {...form}>
        <form
          autoComplete='off'
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
                    autoComplete='off'
                    className='text-lg'
                    disabled={form.formState.isSubmitting}
                    {...field}
                    placeholder="Ingredients, Meals...."
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
            aria-label='Search'
            disabled={form.formState.isSubmitting}
            name='search'
            type='submit'
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
            <SuggestionList suggestions={suggestions} form={form} />
          ) : null}
        </form>
      </Form>
    </>
  )
}
