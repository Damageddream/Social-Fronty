import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showPost: false,
    showUser: false,
  },
  reducers: {
    showPostModal(state) {
      state.showPost = true;
    },
    hidePostModal(state) {
      state.showPost = false;
    },
    showUserModal(state){
      state.showUser = true
    },
    hideUserModal(state){
      state.showUser = false
    }
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
