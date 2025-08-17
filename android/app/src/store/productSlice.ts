import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const req = await fetch('http://10.152.65.132:3001/products', {
        method: 'GET',
      });
      const data = await req.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
      return [];
    }
  },
);

export const setFavouriteZerOne = createAsyncThunk(
  'product/setFavouriteZerOne',
  async (product, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await fetch('http://10.152.65.132:3001/products', {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(getProducts);
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

const productSlice = createSlice({
  name: 'shop',
  initialState: {
    products: [],
    productsCategFilteration: [],
    productsSearchFilteration: [],
    productsFilter: [],
    categClick: false,
    catgProducts: [],
    pageSelect: 'home',
    favouriteList: false,
    cartList: false,
    checkPage: 'shipping',
    vision: false,
    visionImage: null,
    productDetail: '',
    searchValue: false,
  },
  reducers: {
    // Close categories list
    closeCateg: (state, action) => {
      state.categClick = action.payload;
    },

    // Set color to nav link page selected
    selectNavPage: (state, action) => {
      state.pageSelect = action.payload;
    },

    // Show Favourite List
    showFavourite: (state, action) => {
      state.favouriteList = action.payload;
    },

    // Show Card List
    showCart: (state, action) => {
      state.cartList = action.payload;
    },

    // Change checkout page
    changeCheckPage: (state, action) => {
      state.checkPage = action.payload;
    },

    // dispaly Product cart
    visionProductCart: (state, action) => {
      state.vision = action.payload;
    },

    // Show Product detail
    showProductDetails: (state, action) => {
      state.visionImage = action.payload;
    },

    //search field fitration
    filterProducts: (state, action) => {
      state.productsSearchFilteration = state.productsSearchFilteration.filter(
        el => {
          if (el.name.toLowerCase().includes(action.payload.toLowerCase())) {
            state.productsFilter.push(el);
            return null;
          } else {
            return el;
          }
        },
      );

      state.productsFilter = state.productsFilter.filter(el => {
        if (el.name.toLowerCase().includes(action.payload.toLowerCase())) {
          return el;
        } else {
          state.productsSearchFilteration.push(el);
          return null;
        }
      });
    },

    // Set Product Filter State Empty
    setFilterEmpty: state => {
      state.productsFilter = [];
    },

    // show items search list
    showSearchList: (state, action) => {
      state.searchValue = action.payload;
    },

    // filter items with categories
    selectCategory: (state, action) => {
      state.catgProducts = state.productsCategFilteration.filter(
        elem => elem.category === action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productsCategFilteration = action.payload;
      if (state.productsSearchFilteration.length === 0) {
        state.productsSearchFilteration = action.payload;
      }
    });
  },
});

export const { closeCateg } = productSlice.actions;
export const { selectNavPage } = productSlice.actions;
export const { showFavourite } = productSlice.actions;
export const { showCart } = productSlice.actions;
export const { changeCheckPage } = productSlice.actions;
export const { visionProductCart } = productSlice.actions;
export const { showProductDetails } = productSlice.actions;
export const { filterProducts } = productSlice.actions;
export const { setFilterEmpty } = productSlice.actions;
export const { showSearchList } = productSlice.actions;
export const { selectCategory } = productSlice.actions;
export default productSlice.reducer;
