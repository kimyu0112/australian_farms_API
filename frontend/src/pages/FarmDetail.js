import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFarmById } from '../api/farms';
import { getReviews, addReview } from '../api/reviews';
import '../styles/FarmDetail.css';

const FarmDetail = () => {
  const { id } = useParams();
  const [farm, setFarm] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: '', rating: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newReview.comment || !newReview.rating) {
      setError('Please fill out both the comment and rating fields.');
      return;
    }

    try {
      const response = await addReview(id, newReview);
      setReviews([...reviews, response.data]);
      setNewReview({ comment: '', rating: '' });
      setSuccess('Review added successfully!');
    } catch (err) {
      setError('Failed to add review. Please try again.');
    }
  };

  if (!farm) return <div className="loading">Loading farm details...</div>;

  return (
    <div className="farm-detail">
      <div className="farm-header">
        <h1>{farm.name}</h1>
        <p className="farm-description">{farm.description}</p>
        <p className="farm-location">
          <strong>Location:</strong> {farm.location}
        </p>
        <ul className="farm-features">
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
              <p>
                <strong>{review.user}:</strong> {review.comment}
              </p>
              <p>Rating: {review.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this farm.</p>
        )}
      </div>

      <div className="add-review">
        <h2>Add a Review</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleReviewSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Write your review here..."
              required
              style={{ resize: 'none' }}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              required
            >
              <option value="">Select a rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button type="submit" className="submit-review-button">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmDetail;
