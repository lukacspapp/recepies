"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form"
import {
  useFieldArray,
  useForm
} from "react-hook-form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { CheckIcon } from "lucide-react"

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Recipe title must be at least 2 characters.",
    })
    .max(30, {
      message: "Recipe title must not be longer than 30 characters.",
    }),
  category: z
    .string()
    .min(2, {
      message: "Category must be at least 2 characters.",
    })
    .max(30, {
      message: "Category must not be longer than 20 characters.",
    }),
  cuisine: z
    .string()
    .min(2, {
      message: "Cuisine must be at least 2 characters.",
    })
    .max(30, {
      message: "Cuisine must not be longer than 20 characters.",
    }),
  video: z.string().min(5, "Video link must be at least 5 characters."),
  language: z
    .string({
      required_error: "Please select a catgory.",
    })
    .email(),
  instructions: z.string().max(160).min(4),
  ingredients_measurements: z
    .array(
      z.object({
        ingredient: z.string().min(3, "Ingredient must be at least 3 characters."),
        measurement: z.string().min(3, "Measurement must be at least 3 characters.")
      })
    ).max(20, 'You can only have 20 ingredients and measurements.'),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  ingredients_measurements: [
    { ingredient: "", measurement: "" },
  ],
}

export default function CreateMealForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "ingredients_measurements",
    control: form.control,
  })


  function onSubmit(data: ProfileFormValues) {
    console.log(data);

  }

  const languagesList = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ]

  const [languages, setLanguages] = useState(languagesList)
  const [newLanguage, setNewLanguage] = useState('')

  useEffect(() => {

  }, [languages])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Big Mac, Lentil Dahl, etc..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Vegan, Beef, etc..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="cuisine"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine</FormLabel>
              <FormControl>
                <Input placeholder="French, American, etc..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="video"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Link</FormLabel>
              <FormControl>
                <Input placeholder="Youtube, Vimeo, etc..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                          (language) => language.value === field.value
                        )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value)
                          }}
                        >
                          {language.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                      <CommandSeparator className="mt-1" />
                      <CommandList>
                        <CommandGroup>
                          <CommandList>
                            <div className="flex p-1">
                                <Input
                                  onChange={(e) => {setNewLanguage(e.target.value)}}
                                  type="text"
                                  autoCapitalize="on"
                                  placeholder="Add New"
                                  className="h-9"
                                />
                                <Button
                                  onClick={() => {
                                    setLanguages([
                                      ...languages,
                                      { label: newLanguage, value: newLanguage },
                                    ])
                                    form.setValue("language", newLanguage)
                                  }}
                                  type="submit"
                                  variant="ghost"
                                  className="ml-2 h-9"
                                >
                                  +
                                </Button>
                            </div>
                          </CommandList>
                        </CommandGroup>
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add instructions on how to make your meal."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap flex-col item">
          {fields.map((field, index) => (
            <div className="flex w-full relative" key={field.id}>
              <FormField
                control={form.control}
                name={`ingredients_measurements.${index}.ingredient`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Ingredient</FormLabel>
                    <FormControl>
                      <Input className="flex-grow" placeholder="Flour, Sugar, etc..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className={`${form.formState.errors?.ingredients_measurements?.[index] ? 'self-center' : 'self-end'} px-4 m-2`}>-</span>
              <FormField
                control={form.control}
                name={`ingredients_measurements.${index}.measurement`}
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Measurement</FormLabel>
                    <FormControl>
                      <Input className="flex-grow" placeholder="Cups, 2 Teaspoons, etc..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index !== 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-1 right-[-22px] mt-2 mr-2 rounded-full"
                  onClick={() => remove(index)}
                >
                  x
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => append({ ingredient: "", measurement: "" })}
          >
            Add Ingredient And Measurement
          </Button>
        </div>
        <Button type="submit">Create Meal</Button>
      </form>
    </Form>
  )
}