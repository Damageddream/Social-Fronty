
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
    },
    reducers: {
        loggedIn(state) {
            state.loggedIn = !state.loggedIn
        }
    }
})


export default userSlice;
