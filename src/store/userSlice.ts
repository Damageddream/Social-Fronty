import { createSlice } from "@reduxjs/toolkit";
import UserI, { UserApiObject, UserInitialState } from "../interfaces/userI";

const initialState: UserInitialState = {
  loggedIn: false,
  name: "",
  photo: "",
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.loggedIn = action.payload as boolean;
    },
    setUserInfo(state, action) {
      const user: UserI = action.payload as UserApiObject;
      state.name = user.name;
      state.photo = user.photo;
      state.id = user._id;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
