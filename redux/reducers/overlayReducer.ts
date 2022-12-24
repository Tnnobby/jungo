import { createSlice } from "@reduxjs/toolkit";

const overlayReducer = createSlice({
  name: "overlay",
  initialState: {
    overlay: null,
    state: "idle",
    value: null,
    id: null,
  },
  reducers: {
    setBedsheet: (s, payload) => {
      let _val = payload.payload.value;
      if (typeof payload.payload.value === "object")
        _val = JSON.stringify(_val);
      console.log(_val);
      return {
        ...s,
        state: "bedsheet",
        ...payload.payload,
        value: _val,
      };
    },
    setFullPageOverlay: (s, payload) => {
      let _val = payload.payload.value;
      if (typeof _val === "object") _val = JSON.stringify(_val);
      return {
        ...s,
        state: "fullpage",
        ...payload.payload,
        value: _val,
      };
    },
    setOverlayValue: (s, payload) => {
      let _val = payload.payload;
      if (typeof _val === "object") _val = JSON.stringify(_val);
      return {
        ...s,
        value: _val,
      };
    },
    closeOverlay: (s, payload) => {
      return {
        ...s,
        overlay: null,
        state: "idle",
      };
    },
    /**
     * 
     * @param {*} s 
     * @param {*} payload true | false
     * @returns 
     */
    setLoadingOverlayState: (s, {payload}) => {
      return {
        ...s,
        overlay: payload !== 'idle' ? "loading" : null,
        state: payload,
      };
    },
  },
});

export const {
  setOverlayValue,
  setBedsheet,
  closeOverlay,
  setFullPageOverlay,
  setLoadingOverlayState,
} = overlayReducer.actions;
export default overlayReducer.reducer;
