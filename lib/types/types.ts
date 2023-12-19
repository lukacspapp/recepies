export type Recipe = {
  meals: Meal[];
};

export type NewMeal = {
  id: string
  created_at: string
  updated_at: string
  title: string
  image: string
  video_link: string
  creator_id: string
  ingridient_measurement: IngridientMeasurement[]
  category: string
  cuisine: string
  description: string
}

export interface IngridientMeasurement {
  ingridient: string
  measurement: string
}

export type Meal = {
  idMeal: string
  strMeal: string
  strDrinkAlternate: any
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: any
  strYoutube: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strIngredient16: string
  strIngredient17: string
  strIngredient18: string
  strIngredient19: string
  strIngredient20: string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strMeasure16: string
  strMeasure17: string
  strMeasure18: string
  strMeasure19: string
  strMeasure20: string
  strSource: string
  strImageSource: any
  strCreativeCommonsConfirmed: any
  dateModified: any
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
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