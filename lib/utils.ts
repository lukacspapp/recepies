import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractIngredientsAndMeasures(meal: any) {
  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient && measure) {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }

  return { ingredients, measures };
}