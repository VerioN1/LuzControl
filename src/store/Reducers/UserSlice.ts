/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../types/UserTypes';

export interface UserState {
  email: string,
  isAuthenticated: boolean
}

const initialState: UserState = {
  email: '',
  isAuthenticated: true,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserData>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
