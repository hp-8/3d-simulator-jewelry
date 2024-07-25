// sortingSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: '', // Add default sorting option
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortingSlice.actions;
export default sortingSlice.reducer;