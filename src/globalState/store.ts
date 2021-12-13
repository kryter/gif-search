import { configureStore } from '@reduxjs/toolkit';
import gifSearchReducer from './gif-search-slice';
import { apiSlice } from '../api/gifs-api-slice';

export const store = configureStore({
  reducer: {
    gifSearch: gifSearchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;