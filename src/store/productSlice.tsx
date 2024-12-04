import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { RootState } from "../store/store"; // Ensure RootState is correctly imported
import { CartItem } from "../types/productlist-type"; // Ensure CartItem is imported

// Define initial state
interface ProductState {
  data: CartItem[];
  loading: boolean;
  error: string | null;
}

// Define initial state for the slice
const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

// Define the async thunk to fetch products
export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products"); // Replace with actual API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data: CartItem[] = await response.json();
  return data;
});

// Create the slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state (loading)
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous errors
      })
      // Handle fulfilled state (success)
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      // Handle rejected state (error)
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export default productSlice.reducer;
