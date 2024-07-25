import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";
import "../../styles/ProductCard.css";
import { ProductCardProps } from "../../types";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  // Generate a reasonable MRP (10-30% higher than the price)
  const markupPercentage = 10 + Math.random() * 20; // Random between 10% and 30%
  const mrp = Math.round(price * (1 + markupPercentage / 100));

  // Calculate discount percentage
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: id,
        name: name,
        price: price,
        imageURL: imageUrl,
        quantity: 1,
        category: "",
        description: "",
      })
    );
  };

  return (
    <>
      <div className="product-card-container">
        <Link to={`/products/${id}`} className="product-card-link">
          <div className="product-card">
            <img src={imageUrl} alt={name} />
            <div className="product-info">
              <h3>{name}</h3>
              <div className="price-info">
                <p className="price">${price}</p>
                <p className="mrp">
                  <del>${mrp}</del>
                  <span className="discount">{discount}% OFF</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
