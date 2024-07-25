import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);

      if (existingItemIndex !== -1) {
        // If the product already exists in the cart, increase its quantity
        state.items[existingItemIndex].quantity++;
      } else {
        // If the product is not in the cart, add it
        state.items.push(newItem);
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      // Remove the product from the cart based on its ID
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    changeQuantity(state, action: PayloadAction<{ productId: string; newQuantity: number }>) {
      const { productId, newQuantity } = action.payload;
      const existingItem = state.items.find(item => item._id === productId);

      if (existingItem) {
        // Update the quantity of the specified product
        existingItem.quantity = newQuantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
