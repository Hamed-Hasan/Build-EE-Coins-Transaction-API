import axiosInstance from './axiosInstance';

export const fetchUsers = () => {
  return axiosInstance.get('/users');
};

export const createUser = (userData) => {
  return axiosInstance.post('/users', userData);
};

// Add other API calls similarly
