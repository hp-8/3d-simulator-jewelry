// ReviewCard.tsx
import React from 'react';
import '../styles/reviewCard.css';

interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
}

interface ReviewCardProps {
  reviews: Review[];  // Now accepts an array of reviews
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviews }) => {
  return (
    <div className="review-card-container"> {/* Wrap reviews in a container */}
      {reviews.map((review) => (
        <div className="review-card" key={review.id}> 
          <h3>{review.author}</h3>
          <p>{review.content}</p>
          <div className="rating">
            {[...Array(review.rating)].map((_, index) => (
              <span key={index}>★</span> // Display star rating
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
