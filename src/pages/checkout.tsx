// Import necessary packages
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import OrderSummary from '../components/checkout/orderSummary';
import PaymentForm from '../components/checkout/paymentForm';
import ShippingAddress from '../components/checkout/shippingAddress';

// Load Stripe outside of your component
const stripePromise = loadStripe('{YOUR_PUBLISHABLE_KEY}');

const CheckoutPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open the modal when "Place Order" button is clicked
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Checkout</h2>
        </div>
        <div className="checkout-content">
          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <ShippingAddress addresses={[]} />
          </div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <OrderSummary />
          </div>
        </div>
        <div className="payment-details">
          
          <button className="submit-button" type="submit" onClick={handleSubmit}>
            Place Order
          </button>
          {/* Modal for PaymentForm */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Payment Modal"
          >
            <h2>Payment Details</h2>
            {/* Wrap PaymentForm component with Elements provider */}
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
            <button onClick={closeModal}>Cancel Payment</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
