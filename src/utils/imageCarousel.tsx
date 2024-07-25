import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : images.length - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex < images.length - 1 ? prevIndex + 1 : 0);
  };

  return (
    <div className="image-carousel">
      {images.length > 1 && (
        <button className="prev-button" onClick={handlePrevImage}>
          {'<'} 
        </button>
      )}

      <img src={images[currentImageIndex]} alt="Product" className="main-image" />

      {images.length > 1 && (
        <button className="next-button" onClick={handleNextImage}>
          {'>'} 
        </button>
      )}
    </div>
  );
};

export default ImageCarousel;
