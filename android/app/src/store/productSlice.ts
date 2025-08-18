import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/productType';

interface ProductState {
  products: Product[];
  categSelected: string;
}

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const req = await fetch('http://192.168.88.226:3001/products', {
        method: 'GET',
      });
      const data = await req.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

const initialState: ProductState = {
  products: [],
  categSelected: 'All',
};

const productSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    // Send Category from Home to Products
    selectCategory: (state, action) => {
      state.categSelected = action.payload.trim().toLowerCase();
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { selectCategory } = productSlice.actions;
export default productSlice.reducer;
