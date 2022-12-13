import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const INITIAL_STATE = {
  title: '',
  preheat: 350,
  cooktime: { hours: 2, minutes: 25 },
  preptime: { hours: 3, minutes: 1 },
  nutrition_facts: {calories: 243, fats: 20, carbs: 200, protein: 15},
  ingredients: ["3 Oranges", "2 Gallons Milk"],
  description: "This is a description of a recipe that is literally just a bunch of unpeeled oranges... Not very apetizing...",
  instructions: [
    "In a large bowl blend the three oranges, do not peel the oranges as the peels are the most nutritious part of the orange.",
  ],
  photo: []
};

const newRecipeReducer = createSlice({
  name: "edit_recipe",
  initialState: INITIAL_STATE,
  reducers: {
    initNewRecipe: () => INITIAL_STATE,
    setRecipeTitle: (state, payload) => {
      state.title = payload.payload;
    },
    setNewRecipeField: (state, payload) => {
      return {
        ...state,
        ...payload.payload,
      };
    },
    addIngredient: (state, {payload}) => {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          payload
        ]
      }
    },
    editIngredient: (state, payload) => {
      const [index, value] = payload.payload;
      state.ingredients.splice(index, 1, value);
    },
    removeIngredient: (state, payload) => {
      state.ingredients.splice(payload.payload, 1);
    },
    addInstruction: (state, payload) => {
      state.instructions.push(payload.payload);
    },
    editInstruction: (state, payload) => {
      const [index, value] = payload.payload;
      state.instructions.splice(index, 1, value);
    },
    removeInstruction: (state, payload) => {},
    reorderInstructions: (state, {payload}) => {
      return {
        ...state,
        instructions: payload
      }
    }
  },
});

export const selectRecipeFields = (state: RootState) => state.edit_recipe
export const selectIngredients = (state: RootState) => state.edit_recipe.ingredients
export const selectInstructions = (state: RootState) => state.edit_recipe.instructions

export const {
  setNewRecipeField,
  initNewRecipe,
  removeIngredient,
  addIngredient,
  editIngredient,
  editInstruction,
  removeInstruction,
  setRecipeTitle
} = newRecipeReducer.actions;
export default newRecipeReducer.reducer;
