import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, {payload}) => {
      return payload
    },
    setUserDoc: (state, {payload}) => {
      return payload
    }
  },
});

export const {
  setUserInfo
} = userReducer.actions;
export default userReducer.reducer;