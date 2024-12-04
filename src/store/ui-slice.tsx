import { createSlice } from "@reduxjs/toolkit";

interface typeUiSlice {
  isOpenSideDrawer: boolean;
}

const initialState: typeUiSlice = {
  isOpenSideDrawer: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSideDrawerOpen: (state) => {
      state.isOpenSideDrawer = !state.isOpenSideDrawer;
    },
    onIsSideDrawerClose: (state) => {
      state.isOpenSideDrawer = false;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export const uiSliceReducer = uiSlice.reducer;
