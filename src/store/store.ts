import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './api/usersApi';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);
