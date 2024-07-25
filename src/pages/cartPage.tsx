import { MdDelete, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { removeFromCart, changeQuantity } from '../redux/reducers/cartReducer';
import '../styles/cartPage.css';
import placeholderImage from '../assets/backupImg.jpg'; // Import placeholder image
import Header from '../components/header';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(changeQuantity({ productId, newQuantity }));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    // For now, let's just navigate to the checkout page
    navigate('/checkout');
  };

  const handleApplyCoupon = () => {
    // Hardcoded coupon code for demonstration purposes
    const validCouponCode = 'DISCOUNT10';

    if (couponCode === validCouponCode) {
      // Apply discount of 10%
      setDiscount(10);
    } else {
      // Reset discount if invalid coupon code is entered
      setDiscount(0);
    }
  };

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  // Calculate discounted price
  const discountedPrice = totalPrice - (totalPrice * (discount / 100));

  return (<>
    <Header navigationLinks={[
      {
        label: 'Home',
        href: '/',
      },{
        label: 'Products',
        href: '/products'
      }
    ]} />
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.map(item => (
        <div key={item._id} className="cart-item">
          <img src={item.imageURL || placeholderImage} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: 
              <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                <MdRemoveCircleOutline size={20} />
              </button>
              {item.quantity}
              <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                <MdAddCircleOutline size={20} />
              </button>
            </p>
            <button onClick={() => handleRemoveFromCart(item._id)}>
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      ))}
      <div>
        <input 
          type="text" 
          placeholder="Enter coupon code" 
          value={couponCode} 
          onChange={(e) => setCouponCode(e.target.value)} 
          />
        <button onClick={handleApplyCoupon}>Apply Coupon</button>
      </div>
      <div>Total Price: ${totalPrice}</div>
      {discount > 0 && <div>Discount: {discount}%</div>}
      <div>Discounted Price: ${discountedPrice}</div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
          </>
  );
};

export default CartPage;
