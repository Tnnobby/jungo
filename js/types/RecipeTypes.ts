import { Timestamp } from "firebase/firestore"

interface RecipeNutritionFacts {
  protein: number,
  calories: number,
  fats: number,
  carbs: number
}

interface RecipeDetails {
  photo: string,
  title: string,
  nutrition_facts: RecipeNutritionFacts
}

interface RecipeData {
  details: RecipeDetails,
  id: string,
  searchable_title: string,
  created_at: Timestamp
}

export {
  RecipeData,
  RecipeDetails,
  RecipeNutritionFacts
}