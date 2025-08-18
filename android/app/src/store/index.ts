import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';

const store = configureStore({
  reducer: { productSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
