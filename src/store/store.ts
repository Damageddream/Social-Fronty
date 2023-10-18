import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
import editSlice from "./editSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice,
        modal: modalSlice,
        edit: editSlice
    }
});

export type RootState = ReturnType<typeof store.getState>

export default store;