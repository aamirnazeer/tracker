import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  username: string;
}

const initialState: UserState = {
  id: 0,
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedOut: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.id = 0;
      state.username = '';
    },

    loggedIn: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loggedOut, loggedIn } = userSlice.actions;

export default userSlice.reducer;
