import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  priceRange: '',
};

const filteringSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setCategoryFilter(state, action) {
      state.category = action.payload;
    },
    setPriceRangeFilter(state, action) {
      state.priceRange = action.payload;
    },
  },
});

export const { setCategoryFilter, setPriceRangeFilter } = filteringSlice.actions;
export default filteringSlice.reducer;