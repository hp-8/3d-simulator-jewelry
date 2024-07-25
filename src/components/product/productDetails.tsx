import React, { startTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducer';
import productData from '../../products.json';
import '../../styles/productDetails.css';
import Header from '../header';
import { CartItem } from '../../types';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId?: string }>();

  if (!productId) {
    return <div className="product-detail">Invalid product ID</div>;
  }

  const product = productData.find((p) => p._id === productId);

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

  const openSimulator = () => {
    startTransition(()=> {
        navigate(`/simulator/${productId}`);
    })
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      _id: productId, // Use the product ID as the cart item ID
    };
    dispatch(addToCart(cartItem));
  };

  const { name, description, price, imageURL, category } = product;

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
  ];

  return (
    <>
      <Header navigationLinks={navigationLinks} />
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={imageURL} alt={name} />
        </div>
        <div className="product-detail-info">
          <h2>{name}</h2>
          <p className="product-price">${price}</p>
          <p className="product-category"><strong>Category:</strong> {category}</p>
          <p className="product-description"><strong>Description:</strong> {description}</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-primary" onClick={openSimulator}>View in Simulator</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
