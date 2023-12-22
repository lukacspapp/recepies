import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { IngredientAndMeasure, Meal } from "./types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractIngredientsAndMeasures(meal: Meal): IngredientAndMeasure {
  const ingredients: string[] = [];
  const measures: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient && measure) {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }

  return { ingredients, measures };
}

export function pickTwoNumbers() {
  const start = Math.floor(Math.random() * 292);

  const n1 = start;
  const n2 = start + 9;

  return { n1, n2 };
}


export function generateIdRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getOffsetEnd(offSetEnd: number , mealsLength: number) {
  if (offSetEnd > mealsLength) {
    return mealsLength
  }
  return offSetEnd
}

export function formatTitle(title: string) {
  // Replace underscores with spaces
  let reversedString = title.replace(/_/g, ' ');

  // Capitalize the first letter of each word
  reversedString = reversedString.replace(/\b\w/g, (match) => match.toUpperCase());

  return reversedString;
}

export function formatToLowerCaseWithUnderscores(title: string) {
  // Replace spaces with underscores and convert to lowercase
  let formattedTitle = title.trim().toLowerCase().replace(/\s+/g, '_');

  // Remove consecutive underscores
  formattedTitle = formattedTitle.replace(/_+/g, '_');

  // Remove leading underscore
  if (formattedTitle.startsWith('_')) {
    formattedTitle = formattedTitle.substring(1);
  }

  return formattedTitle;
}

export function formatToMealDBTitle(input: string) {
  // Replace hyphens with underscores
  let result = input.replace(/-/g, '_');

  // Replace consecutive underscores with a single underscore
  result = result.replace(/_+/g, '_');

  // Remove leading and trailing underscores
  result = result.replace(/^_+|_+$/g, '');

  // Convert to lowercase
  result = result.toLowerCase();

  return result;
}

export function serializeSlug(slug: string) {
  const slugName = slug.toLowerCase().replace(/\s/g, "-")
  const slugNameNoSpecialChar = slugName.replace(/[^a-zA-Z0-9-]/g, "");
  const serializedString = slugNameNoSpecialChar.replace(/-*$/,"")
  return serializedString.replace(/-{2,}/g, "-")
}

export function serializeSearchParam(searchParam: string) {
  const serializedString = searchParam.toLowerCase().replace(/\s/g, "_").replace(/[^a-zA-Z0-9-_]/g, "")
  return serializedString.replace(/_{2,}/g, "_").replace(/_/g, ",")
}