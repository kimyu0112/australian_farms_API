import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFarmById } from '../api/farms';
import { getReviews } from '../api/reviews';

const FarmDetail = () => {
  const { id } = useParams(); // Extract the farm ID from the URL
  const [farm, setFarm] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch farm details
    getFarmById(id)
      .then((response) => setFarm(response.data))
      .catch((error) => console.error('Error fetching farm details:', error));

    // Fetch reviews for the farm
    getReviews(id)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [id]);

  if (!farm) return <div>Loading...</div>;

  return (
    <div className="farm-detail">
      <div className="farm-header">
        <h1>{farm.name}</h1>
        <p>{farm.description}</p>
        <p><strong>Location:</strong> {farm.location}</p>
        <ul>
          {farm.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        {farm.images[0] && (
          <img
            src={farm.images[0]}
            alt={farm.name}
            className="farm-detail-image"
          />
        )}
      </div>

      <div className="farm-reviews">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p><strong>{review.user}:</strong> {review.comment}</p>
              <p>Rating: {review.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this farm.</p>
        )}
      </div>
    </div>
  );
};

export default FarmDetail;
