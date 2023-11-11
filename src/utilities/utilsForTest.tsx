import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { EnhancedStore, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { RootState } from "../store/store";
import uiSlice from "../store/uiSlice";
import userSlice from "../store/userSlice";
import modalSlice from "../store/modalSlice";
import editSlice from "../store/editSlice";
import deleteSlice from "../store/deleteSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore<RootState>;

}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {} as PreloadedState<RootState>,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        user: userSlice,
        ui: uiSlice,
        modal: modalSlice,
        edit: editSlice,
        delete: deleteSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
