import React from 'react';
import '../styles/imageBanner.css'
import { ImageBannerProps } from '../types';


const ImageBanner: React.FC<ImageBannerProps> = ({
  image1,
  image2,
  catchyLine,
  buttonText = 'Shop Now', // Set default button text
  buttonLink,
}) => {
  return (
    <div className="image-banner-container">
      <div className="image-wrapper image-1">
        <img src={image1} alt="Image 1" />
      </div>
      <div className="image-wrapper image-2">
        <img src={image2} alt="Image 2" />
      </div>
      <div className="text-box-container">
        <p className="catchy-line">{catchyLine}</p>
        {buttonLink && (
          <a href={buttonLink} className="banner-button">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default ImageBanner;