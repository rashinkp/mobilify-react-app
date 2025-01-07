import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.js";
import { apiSlice } from "./slices/apiSlices.js";
import authAdminReducer from './slices/authAdmin.js'
import authUserReducer from './slices/authUser.js'
import cartReducer from './slices/cartCount.js';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    adminAuth: authAdminReducer,
    userAuth: authUserReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});


export default store;
