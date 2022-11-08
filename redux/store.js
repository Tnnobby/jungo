import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "./reducers/cameraReducer";
import navigationReducer from "./reducers/navigationReducer";
import newRecipeReducer from "./reducers/newRecipeReducer";
import overlayReducer from "./reducers/overlayReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    camera: cameraReducer,
    overlay: overlayReducer,
    edit_recipe: newRecipeReducer,
    user: userReducer
  }
})