import { configureStore } from "@reduxjs/toolkit";
import { brandsReducer } from "./slices/brandSlice";
import { devicesReducer } from "./slices/devicesSlice";
import { cartReducer } from "./slices/cartSlice";
import { compareReducer } from "./slices/compareSlice";
import { authReducer } from "./slices/authSlice";
import { languageReducer } from "./slices/languageSlice";

const store = configureStore({
  reducer: {
    brands: brandsReducer,
    devices: devicesReducer,
    cart: cartReducer,
    compare: compareReducer,
    auth: authReducer,
    language: languageReducer,
  },
});

export default store;
