import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  username: string;
  name: string;
  loggedIn: boolean;
  email: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  username: '',
  loggedIn: false,
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      initialState;
    },

    logIn: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.loggedIn = true;
      state.email = action.payload.email;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
