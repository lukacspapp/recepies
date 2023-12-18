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
import { NewMeal } from '@/lib/types/types'
import { Loader2 } from 'lucide-react'
import SuggestionList from './SuggestionList'


type SearchBarProps = {
  ingredients: string[]
  categories: string[]
  areas: string[]
  setMealList: React.Dispatch<React.SetStateAction<NewMeal[]>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  inView: boolean
  offsetStart: number
  offsetEnd: number
}

export default function SearchBar({
  ingredients,
  categories,
  areas,
  setMealList,
  setLoading,
  inView,
  offsetStart,
  offsetEnd
}: SearchBarProps) {

  const formSchema = z.object({
    search: z.string().min(1, { message: "Search is Empty" }).max(25),
    type: z.string(),
    offsetStart: z.number(),
    offsetEnd: z.number()
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      type: "",
      offsetStart: offsetStart,
      offsetEnd: offsetEnd
    },
  })
  const [suggestions, setSuggestions] = useState<{ suggestion: string; type: string; }[]>([])

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


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSuggestions([])
    setLoading(true)
    const res = fetch('/api/cuisinies', {
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


    setMealList((prevMealList) => [...prevMealList, ...meals]);

    setLoading(false)
  }

  useEffect(() => {
    if (inView) {
      setLoading(true)
      onSubmit(form.getValues())
      setLoading(false)
    }

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
