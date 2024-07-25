// addressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, AddressBookState } from '../../types';

const initialState: AddressBookState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    fetchAddressesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAddressesSuccess(state, action: PayloadAction<Address[]>) {
      state.loading = false;
      state.error = null;
      state.addresses = action.payload;
    },
    fetchAddressesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addAddress(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
    },
    selectPrimaryAddress(state, action: PayloadAction<number>) {
      state.addresses.forEach((address) => {
        address.isPrimary = address.id === action.payload;
      });
    },
    removeAddress(state, action: PayloadAction<number>) {
      state.addresses = state.addresses.filter((address) => address.id !== action.payload);
    },
  },
});

export const { fetchAddressesStart, fetchAddressesSuccess, fetchAddressesFailure, addAddress, selectPrimaryAddress, removeAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
