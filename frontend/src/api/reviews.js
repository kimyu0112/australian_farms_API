import axios from 'axios';

const API_URL = 'https://australian-farms-mern-app.onrender.com/api/farms';

export const getReviews = async (farmId) => axios.get(`${API_URL}/${farmId}/reviews`);
export const addReview = async (farmId, review, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(`${API_URL}/${farmId}/reviews`, review, config);
};
export const deleteReview = async (farmId, reviewId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.delete(`${API_URL}/${farmId}/reviews/${reviewId}`, config);
};

