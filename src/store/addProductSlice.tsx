import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the type for a Product
interface Product {
  title: string;
  price: number;
  description: string;
  image: string;
}

// Define the initial state type
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to add a product to the fake API and Redux store
export const addProductAsync: any = createAsyncThunk("products/addProduct", async (product: Omit<Product, "id">, { rejectWithValue }) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newProduct = await response.json();
    return newProduct;
  } catch (error) {
    return rejectWithValue("Failed to add product");
  }
});

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add the new product to the list
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
