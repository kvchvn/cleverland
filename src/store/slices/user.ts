import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable, User } from '../../types';

type UserSliceState = {
  data: Nullable<User>;
};

const initialState: UserSliceState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.data = payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions;
