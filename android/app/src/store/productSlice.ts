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

// Add Product to Cart

export const addToCart = createAsyncThunk(
  'product/addToCart',
  async (item: ProductType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart: ProductType[] = storedCart ? JSON.parse(storedCart) : [];

      const isAlreadyInCart = cart.some(prod => prod._id === item._id);
      let updatedCart;

      if (isAlreadyInCart) {
        updatedCart = [...cart];
      } else {
        updatedCart = [...cart, item];
      }

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

// Remove Product from Cart

export const removeFromCart = createAsyncThunk(
  'product/removeFromCart',
  async (item: ProductType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const cart: ProductType[] = storedCart ? JSON.parse(storedCart) : [];

      const productRemoving = cart.filter(prod => prod._id !== item._id);

      const updatedCart = productRemoving;

      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue(error);
      }
    }
  },
);

// Make Order after checkOut

export const makeOrder = createAsyncThunk(
  'product/makeOrder',
  async (data: ProductType[], thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `http://192.168.88.226:3001/orders/storedOrder`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );

      const order = await response.json();

      return order;
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
  cart: ProductType[];
  checkInfo: ProductType[];
  orders: [];
}

const initialState: ProductState = {
  products: [],
  categSelected: 'All',
  pageSelected: 'home',
  visibilityOfNav: true,
  productSelected: null,
  favourites: [],
  cart: [],
  checkInfo: [],
  orders: [],
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

    // Display Selected Product Details
    setFavEmpty: state => {
      AsyncStorage.removeItem('favourites');
      state.favourites = [];
    },

    // Display Selected Product Details
    setCartEmpty: state => {
      AsyncStorage.removeItem('cart');
      state.cart = [];
    },

    // Add checkout info
    addCheckOutInfo: (state, action) => {
      state.checkInfo = action.payload;
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
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const {
  selectCategory,
  selectPage,
  visibleNavbar,
  selectProduct,
  setFavEmpty,
  setCartEmpty,
  addCheckOutInfo,
} = productSlice.actions;
export default productSlice.reducer;
