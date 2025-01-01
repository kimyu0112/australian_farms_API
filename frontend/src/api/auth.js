import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const signup = async (userDetails) => {
  return axios.post(`${API_URL}/signup`, userDetails);
};
