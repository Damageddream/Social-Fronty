import { createSlice } from "@reduxjs/toolkit";
import UserI, {UserApiObject} from "../interfaces/userI";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    name: "",
  },
  reducers: {
    loggedIn(state, action) {
      state.loggedIn = action.payload as boolean
    },
    setUserInfo(state, action) {
      const user: UserI = action.payload as UserApiObject;
      state.name = user.name;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
