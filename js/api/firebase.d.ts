import { Timestamp } from "firebase/firestore";

type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};
type HourMinuteTime = {
  hours: number;
  minutes: number;
};

export interface Recipe {
  created_at: FirebaseTimestamp;
  details: {
    cooktime: HourMinuteTime;
    description: string;
    ingredients: string[];
    instructions: string[];
    nutrition_facts: {
      calories: number;
      carbs: number;
      fats: number;
      protein: number;
    };
    photo: string;
    preptime: HourMinuteTime;
    preheat: number;
    title: string;
  };
  id: string;
  searchable_title: string;
}
