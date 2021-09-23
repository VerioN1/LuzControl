/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../types/UserTypes';

const initialState: IUserData = {
  email: '',
  course: '',
  name: '',
  isAuthenticated: true,
  token: '',
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserData>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.course = action.payload.course;
      state.role = action.payload?.role;
      state.token = action.payload.token;
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
