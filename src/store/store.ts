import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;