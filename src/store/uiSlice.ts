import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    error: {
      errorStatus: false,
      errorInfo: "",
    },
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
    setError(state, action) {
      const error: string = action.payload as string;
      state.error.errorInfo = error;
      state.error.errorStatus = true;
    },
    removeError(state) {
      state.error.errorInfo = "";
      state.error.errorStatus = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
