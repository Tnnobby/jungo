import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { InstructionEditModal } from "../js/AddRecipe/edit-instruction-overlay";
import InstructionPage from "../js/AddRecipe/InstructionPage";
import NutritionDetailsBedsheet from "../js/AddRecipe/nutrition-bedsheet";
import StartPage from "../js/AddRecipe/StartPage";
import TemperatureBedsheet from "../js/AddRecipe/temperature-bedsheet";
import TimerBedsheet from "../js/AddRecipe/timer-bedsheet";
import { NutritionFacts } from "../js/api/firebase";
import { RootPageProps } from "./routes";

export type BedsheetProps<T> = {
  initialValue: T;
};

export type ModalProps<T> = {
  initialValue: T;
};

export type AddRecipeStack = {
  pageone: undefined;
  pagetwo: undefined;
  "timer-bedsheet": BedsheetProps<{ hours: number; minutes: number }>;
  "nutrition-bedsheet": BedsheetProps<NutritionFacts>;
  "temperature-bedsheet": BedsheetProps<number>;
  "instruction-modal": ModalProps<{ id: string; value: string }>;
};

const AddRecipe = createNativeStackNavigator<AddRecipeStack>();

type AddRecipeRouter = RootPageProps<"add-recipe">;

export default function AddRecipeRouter({
  navigation,
  route,
}: AddRecipeRouter) {
  return (
    <AddRecipe.Navigator initialRouteName="pageone">
      <AddRecipe.Group
        screenOptions={{
          animation: Platform.OS === "ios" ? "simple_push" : "slide_from_right",
          headerShown: false,
        }}
      >
        <AddRecipe.Screen name="pageone" component={StartPage} />
        <AddRecipe.Screen name="pagetwo" component={InstructionPage} />
      </AddRecipe.Group>
      {/* Bedsheet Group */}
      <AddRecipe.Group
        screenOptions={{
          animation: "none",
          presentation: "transparentModal",
          headerShown: false,
        }}
      >
        <AddRecipe.Screen
          name="nutrition-bedsheet"
          component={NutritionDetailsBedsheet}
        />
        <AddRecipe.Screen
          name="temperature-bedsheet"
          component={TemperatureBedsheet}
        />
        <AddRecipe.Screen name="timer-bedsheet" component={TimerBedsheet} />
      </AddRecipe.Group>
      {/* Full Screen Modal Group */}
      <AddRecipe.Group
        screenOptions={{
          animation: Platform.OS === "ios" ? "simple_push" : "slide_from_right",
          headerShown: false,
          presentation: "modal",
        }}
      >
        {/* TODO : Edit Instructions */}
        <AddRecipe.Screen
          name="instruction-modal"
          component={InstructionEditModal}
        />
      </AddRecipe.Group>
    </AddRecipe.Navigator>
  );
}
