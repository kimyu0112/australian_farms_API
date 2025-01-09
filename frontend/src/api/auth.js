import axios from 'axios';

const API_URL = 'https://australian-farms-mern-app.onrender.com/api/auth';

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const signupUser = async (userDetails) => {
  return axios.post(`${API_URL}/signup`, userDetails);
};
