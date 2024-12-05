import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/productlist-type";

const initialState: any = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.cartItems.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      console.log("remove action", action.payload);
      const filterdCart = state.cartItems.filter((item: any) => item.id !== action.payload);
      state.cartItems = filterdCart;
    },
    // Action to clear the entire cart
    clear() {
      return [];
    },
  },
});
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
