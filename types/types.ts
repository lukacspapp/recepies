import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const formSchema = z.object({
  search: z.string().min(1, { message: "Search is Empty" }).max(25),
  type: z.string(),
  offsetStart: z.number(),
  offsetEnd: z.number()
})

const deafultSearchValues = {
  search: "",
  type: "",
  offsetStart: 0,
  offsetEnd: 10
}

const useFormDefaultSearchSchema = z.object({}).merge(formSchema)

export const defaultFromValues = {
  defaultValues: deafultSearchValues,
  resolver: zodResolver(useFormDefaultSearchSchema),
}

export interface IngridientMeasurement {
  ingridient: string
  measurement: string
}

export interface DescriptionType  {
  title: string
  description: string
  hideBreak?: boolean
}

export type SuggestionType = 'categories' | 'cuisines' | 'ingredient' ;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' ;

export type CuisineColors = {
  [key: string]: string;
};

export type DatabaseMealID = {
  meal_id: string
}

export type IngredientAndMeasure = {
  ingredients: string[];
  measures: string[];
};

export type SearchType = 'Category' | 'Cuisine' | 'Ingredient' ;
