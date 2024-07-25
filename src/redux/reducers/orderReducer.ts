// orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState } from '../../types';

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action: PayloadAction<Order[]>) {
      state.loading = false;
      state.error = null;
      state.orders = action.payload;
    },
    fetchOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;

export default orderSlice.reducer;
