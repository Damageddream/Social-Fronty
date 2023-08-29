import { createSlice } from "@reduxjs/toolkit";
import UserI, { UserApiObject, UserInitialState, UserJWT } from "../interfaces/userI";

const initialState: UserInitialState = {
  loggedIn: false,
  name: "",
  photo: "",
  id: null,
  friends: [],
  invites: [],
  invitesSent: [],
  friendsS: [],

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
      state.friends = user.friends;
      state.invites = user.invites;
      state.invitesSent = user.invitesSent;
    },
    setUserFromJWT(state, action) {
      const user = action.payload as UserJWT;
      state.name = user.name;
      state.photo = user.photo;
      state.id = user._id;
      state.friendsS = user.friends;
      state.invites = user.invites;
      state.invitesSent = user.invitesSent;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
