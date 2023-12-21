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
