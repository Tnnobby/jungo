import { createSlice } from "@reduxjs/toolkit";

const cameraReducer = createSlice({
  name: "camera",
  initialState: {
    state: "idle",
    photos: [],
  },
  reducers: {
    launchCamera: (s, payload) => {
      return {
        ...s,
        state: "open",
        photos: [],
      };
    },
    setCameraOpen: (s, payload) => {
      return {
        ...s,
        state: "open",
      };
    },
    setCameraError: (s, payload) => {
      return {
        ...s,
        state: payload.payload,
      };
    },
    closeCamera: (s, payload) => {
      return {
        ...s,
        state: "idle",
      };
    },
    addPhoto: (s, payload) => {
      s.photos.push(payload.payload);
    },
  },
});

export const {
  addPhoto,
  closeCamera,
  setCameraError,
  setCameraOpen,
  launchCamera,
} = cameraReducer.actions;
export default cameraReducer.reducer;
