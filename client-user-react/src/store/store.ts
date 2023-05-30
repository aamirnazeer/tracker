import { configureStore } from '@reduxjs/toolkit';
import { ledgerApi } from './ledger/ledgerSlice';

export const store = configureStore({
  reducer: {
    [ledgerApi.reducerPath]: ledgerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ledgerApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
