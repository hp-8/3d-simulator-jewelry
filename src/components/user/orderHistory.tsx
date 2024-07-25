// OrderHistory.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } from '../../redux/reducers/orderReducer';

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);
  const loading = useSelector((state: RootState) => state.order.loading);
  const error = useSelector((state: RootState) => state.order.error);

  useEffect(() => {
    dispatch(fetchOrdersStart());
    // Replace this with your API call to fetch orders from backend
    fetch('https://api.example.com/orders')
      .then((response) => response.json())
      .then((data) => dispatch(fetchOrdersSuccess(data)))
      .catch((error) => dispatch(fetchOrdersFailure(error.message)));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Date: {order.date}</p>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Status: {order.status}</p>
          {/* Render other order details as needed */}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
