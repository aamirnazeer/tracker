import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  id: 0,
  firstname: '',
  lastname: '',
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
      state.firstname = '';
      state.lastname = '';
      state.loggedIn = false;
    },

    logIn: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.loggedIn = true;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
