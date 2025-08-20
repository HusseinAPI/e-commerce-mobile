import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productType';

interface ProductState {
  products: ProductType[];
  categSelected: string;
  pageSelected: string;
  visibilityOfNav: boolean;
  productSelected: ProductType | null;
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
  pageSelected: 'home',
  visibilityOfNav: true,
  productSelected: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Send Category from Home to Products
    selectCategory: (state, action) => {
      state.categSelected = action.payload.trim().toLowerCase();
    },

    // Select Page to change Navbar
    selectPage: (state, action) => {
      state.pageSelected = action.payload;
    },

    // Hidden Navbar in some pages
    visibleNavbar: (state, action) => {
      state.visibilityOfNav = action.payload;
    },

    // Display Selected Product Details
    selectProduct: (state, action) => {
      state.productSelected = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { selectCategory, selectPage, visibleNavbar, selectProduct } =
  productSlice.actions;
export default productSlice.reducer;
