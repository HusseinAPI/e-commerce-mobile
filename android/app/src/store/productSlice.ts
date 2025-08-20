import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../types/productType';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Add Product to Watchlist

export const addToFavourite = createAsyncThunk(
  'product/addToFavourite',
  async (item: ProductType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      const favourites: ProductType[] = storedFavourites
        ? JSON.parse(storedFavourites)
        : [];

      const isAlreadyFavourite = favourites.some(fav => fav._id === item._id);
      let updatedFavourites;

      if (isAlreadyFavourite) {
        updatedFavourites = [...favourites];
      } else {
        updatedFavourites = [...favourites, item];
      }

      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(updatedFavourites),
      );
      return updatedFavourites;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

// Remove Product from Watchlist

export const removeFromFav = createAsyncThunk(
  'product/removeFromFav',
  async (item: ProductType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const storedFavourites = await AsyncStorage.getItem('favourites');
      const favourites: ProductType[] = storedFavourites
        ? JSON.parse(storedFavourites)
        : [];

      const productRemoving = favourites.filter(fav => fav._id !== item._id);

      const updatedFavourites = productRemoving;

      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(updatedFavourites),
      );
      return updatedFavourites;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

interface ProductState {
  products: ProductType[];
  categSelected: string;
  pageSelected: string;
  visibilityOfNav: boolean;
  productSelected: ProductType | null;
  favourites: ProductType[];
}

const initialState: ProductState = {
  products: [],
  categSelected: 'All',
  pageSelected: 'home',
  visibilityOfNav: true,
  productSelected: null,
  favourites: [],
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
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(removeFromFav.fulfilled, (state, action) => {
        state.favourites = action.payload;
      });
  },
});

export const { selectCategory, selectPage, visibleNavbar, selectProduct } =
  productSlice.actions;
export default productSlice.reducer;
