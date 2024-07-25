// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';

const initialState: UserState = {
  username: '',
  email: '',
  mobileNumber: '',
  address: '',
  birthDate: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
