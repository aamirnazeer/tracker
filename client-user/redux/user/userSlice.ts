import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  username: string;
  name: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  id: 0,
  name: '',
  username: '',
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.id = 0;
      state.username = '';
      state.name = '';
      state.loggedIn = false;
    },

    logIn: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.loggedIn = true;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
