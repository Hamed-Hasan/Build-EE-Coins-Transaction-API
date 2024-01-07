import * as api from './api';

export const getUsers = async () => {
  try {
    const response = await api.fetchUsers();
    // Business logic here
    return response.data;
  } catch (error) {
    // Error handling
  }
};

