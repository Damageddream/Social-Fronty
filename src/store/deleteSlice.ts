import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: "delete",
  initialState: {
    deleteComment: 0,
    deletedPost: 0,
    deleteProfile: 0,
  },
  reducers: {
    deleteComment(state) {
      state.deleteComment += 1;
    },
    deletePost(state) {
      state.deletedPost += 1;
    },
    deleteProfile(state) {
      state.deleteProfile += 1;
    },
  },
});

export const deleteActions = deleteSlice.actions;
export default deleteSlice.reducer;
