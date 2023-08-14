import { configureStore } from '@reduxjs/toolkit';
import { brandsReducer } from './slices/brandSlice';
import { categoriesReducer } from './slices/categoriesSlice';
import { devicesReducer } from './slices/devicesSlice';
import { cartReducer } from './slices/cartSlice';
import { compareReducer } from './slices/compareSlice';
import { authReducer } from './slices/authSlice';

const store = configureStore({
  reducer: {
    brands: brandsReducer,
    categories: categoriesReducer,
    devices: devicesReducer,
    cart: cartReducer,
    compare: compareReducer,
    auth: authReducer,
  },
});

export default store;
