import { configureStore } from '@reduxjs/toolkit';
import { brandsReducer } from './slices/brandSlice';
import { categoriesReducer } from './slices/categoriesSlice';
import { devicesReducer } from './slices/devicesSlice';
import { cartReducer } from './slices/cartSlice';

const store = configureStore({
  reducer: {
    brands: brandsReducer,
    categories: categoriesReducer,
    devices: devicesReducer,
    cart: cartReducer,
  },
});

export default store;
