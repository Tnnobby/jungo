import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 'profile',
  stack: ['profile'],
  state: 'idle'
}

const navReducer = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setPage: (s, payload) => {
      return {
        ...s,
        stack: [...s.stack, s.page],
        page: payload.payload,
        state: "to_new",
      };
    },
    backPage: (s, payload) => {
      if (s.stack.length > 0){
        return {
          ...s,
          stack: s.stack.slice(0, -1),
          page: s.stack[s.stack.length - 1],
          state: "to_old",
        };
      }
      
    },
    setPageFinished: (s, payload) => {
      return {
        ...s,
        state: "idle",
      };
    },
  },
});

export const { setPage, backPage, setPageFinished } = navReducer.actions;
export default navReducer.reducer;
