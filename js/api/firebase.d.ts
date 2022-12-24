import { CameraCapturedPicture } from "expo-camera";
import { Timestamp } from "firebase/firestore";

type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};
type HourMinuteTime = {
  hours: number;
  minutes: number;
};

export type NutritionFacts = {
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}

export type RecipeDetails = {
  cooktime: HourMinuteTime;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutrition_facts: NutritionFacts;
  photo: string;
  preptime: HourMinuteTime;
  preheat: number;
  title: string;
}

export interface Recipe {
  created_at: FirebaseTimestamp;
  details: RecipeDetails;
  id: string;
  searchable_title: string;
  owner_id: string;
}
