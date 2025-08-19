import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: { productSlice, authSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
