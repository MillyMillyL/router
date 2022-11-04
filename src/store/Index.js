import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { AuthApi } from "./api/AuthApi";
import studentApi from "./api/studentApi";
import { AuthSlice } from "./reducer/AuthSlice";

const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    auth: AuthSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, studentApi.middleware),
});

setupListeners(store.dispatch);

export default store;
