import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItem } from '../../types';

const OrderSummary: React.FC = () => {
  // Access cart items from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <ul>
        {cartItems.map((item: CartItem) => (
          <li key={item._id}>
            <p>Name: {item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            {/* Display other details of the item as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;
