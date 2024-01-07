import * as api from './api';

export const getEmployeeList = async () => {
    try {
        const response = await api.fetchEmployeeList();
        // You can add more business logic here if needed
        return response.data;
    } catch (error) {
        console.error('Error fetching employee list:', error);
        // Handle error appropriately
        throw error;
    }
};
