import axios from 'axios';

const API_URL = 'http://localhost:5000/api/farms';

export const getFarms = async () => axios.get(API_URL);
export const getFarmById = async (id) => axios.get(`${API_URL}/${id}`);
export const addFarm = async (farm, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(API_URL, farm, config);
};
export const updateFarm = async (id, farm, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.patch(`${API_URL}/${id}`, farm, config);
};
export const deleteFarm = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.delete(`${API_URL}/${id}`, config);
};
