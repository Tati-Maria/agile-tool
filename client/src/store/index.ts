import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/store/slices/api-slice';
import authSlice from '@/store/slices/auth-slice';
import modalSlice from '@/store/slices/modal-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
