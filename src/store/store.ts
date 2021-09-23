/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Reducers/CounterSlice';
import userSlice from './Reducers/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userData: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
