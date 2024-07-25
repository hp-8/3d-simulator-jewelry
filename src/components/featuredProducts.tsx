// FeaturedProducts.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';
import ProductCard from './product/productCard';
import gsap from 'gsap'; // Import GSAP
import '../styles/featuredProducts.css'; // Import CSS for FeaturedProducts

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  // Shuffle array function to randomly reorder products
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Randomly select 8 products to showcase
    const randomProducts = shuffleArray(products).slice(0, 8);
    setShuffledProducts(randomProducts);

    // Scroll the wrapper element using GSAP
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const wrapperWidth = wrapper.scrollWidth;
      const duration = 60; // Increase duration for slower animation (in seconds)
      const distance = wrapperWidth + window.innerWidth; // Distance to scroll

      // Create a GSAP animation timeline
      const tl = gsap.to(wrapper, {
        x: -distance,
        duration: duration,
        ease: 'linear',
        repeat: -1, // Repeat the animation infinitely
      });

      // Play the animation on mount
      tl.play();

      // Pause the animation on hover
      wrapper.addEventListener('mouseenter', () => {
        tl.pause();
      });

      // Resume the animation on mouse leave
      wrapper.addEventListener('mouseleave', () => {
        tl.play();
      });
    }
  }, [products]);

  return (
    <div className="featured-products-container">
      <div className="scrolling-wrapper" ref={wrapperRef}>
        {shuffledProducts.map((product) => (
          <ProductCard key={product._id} id={product._id} name={product.name} price={product.price} imageUrl={product.imageURL} /> 
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
