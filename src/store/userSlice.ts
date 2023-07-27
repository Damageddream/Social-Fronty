import { createSlice } from "@reduxjs/toolkit";
import UserI from "../interfaces/userI";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    name: "",
  },
  reducers: {
    loggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },
    setUserInfo(state, action) {
      const user: UserI = action.payload as UserI;
      state.name = user.name;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
