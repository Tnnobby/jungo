import { createSlice } from "@reduxjs/toolkit";
import { RecipeDetails } from "../../js/api/firebase";
import { RootState } from "../store";

const INITIAL_STATE: RecipeDetails = {
  title: null,
  preheat: 0,
  cooktime: { hours: 0, minutes: 0 },
  preptime: { hours: 0, minutes: 0 },
  nutrition_facts: { calories: 0, fats: 0, carbs: 0, protein: 0 },
  ingredients: [],
  description: null,
  instructions: [],
  photo: null,
};

type PayloadType<T> = { type: string, payload: T}

const newRecipeReducer = createSlice({
  name: "edit_recipe",
  initialState: INITIAL_STATE,
  reducers: {
    initNewRecipe: () => INITIAL_STATE,
    setRecipeTitle: (state, payload) => {
      state.title = payload.payload;
    },
    setNewRecipeField: (state, {payload}: PayloadType<Partial<RecipeDetails>>) => {
      return {
        ...state,
        ...payload,
      };
    },
    addIngredient: (state, { payload }) => {
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      };
    },
    editIngredient: (
      state,
      { payload }: { payload: { index: number; value: string } }
    ) => {
      const { index, value } = payload;
      state.ingredients.splice(index, 1, value);
    },
    removeIngredient: (state, { payload }: { payload: number }) => {
      state.ingredients.splice(payload, 1);
    },
    reorderIngredients: (state, {payload}: {payload: string[]}) => {
      return {
        ...state,
        ingredients: payload
      }
    },
    addInstruction: (state, payload) => {
      state.instructions.push(payload.payload);
    },
    editInstruction: (
      state,
      payload: { type: string; payload: { index: number; value: string } }
    ) => {
      const { index, value } = payload.payload;
      console.log(
        "🚀 ~ file: newRecipeReducer.ts:54 ~ payload",
        payload.payload
      );
      state.instructions[index] = value;
    },
    removeInstruction: (state, { payload }: { payload: number }) => {
      state.instructions.splice(payload, 1);
    },
    reorderInstructions: (state, { payload }) => {
      return {
        ...state,
        instructions: payload,
      };
    },
    addPhoto: (state, { payload }: PayloadType<string>) => {
      console.log("payload", payload);
      return {
        ...state,
        photo: payload,
      };
    },
  },
});

export const selectRecipeFields = (state: RootState) => state.edit_recipe;
export const selectIngredients = (state: RootState) =>
  state.edit_recipe.ingredients;
export const selectInstructions = (state: RootState) =>
  state.edit_recipe.instructions;

export const {
  setNewRecipeField,
  initNewRecipe,
  removeIngredient,
  addIngredient,
  editIngredient,
  addInstruction,
  editInstruction,
  removeInstruction,
  setRecipeTitle,
  addPhoto,
  reorderIngredients,
  reorderInstructions
} = newRecipeReducer.actions;
export default newRecipeReducer.reducer;
