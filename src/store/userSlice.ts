import { createSlice } from "@reduxjs/toolkit";
import UserI, { UserApiObject, UserInitialState, UserJWT } from "../interfaces/userI";

const initialState: UserInitialState = {
  loggedIn: false,
  name: "",
  photo: "",
  _id: "",
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
      state._id = user._id;
      state.friends = user.friends;
      state.invites = user.invites;
      state.invitesSent = user.invitesSent;
    },
    setUserFromJWT(state, action) {
      const user = action.payload as UserJWT;
      state.name = user.name;
      state.photo = user.photo;
      state._id = user._id;
      state.friendsS = user.friends;
      state.invites = user.invites;
      state.invitesSent = user.invitesSent;
    },
    logOut(state){
      state.loggedIn = false
      state.name = "";
      state.photo = "";
      state._id = "";
      state.friends = [];
      state.invites = [];
      state.invitesSent = [];
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
