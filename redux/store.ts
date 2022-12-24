import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "./reducers/cameraReducer";
import newRecipeReducer from "./reducers/newRecipeReducer";
import overlayReducer from "./reducers/overlayReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    camera: cameraReducer,
    overlay: overlayReducer,
    edit_recipe: newRecipeReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;