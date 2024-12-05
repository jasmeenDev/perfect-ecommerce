import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import { uiSliceReducer } from "./ui-slice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    ui: uiSliceReducer,
    products: productSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;