import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice,
        modal: modalSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;