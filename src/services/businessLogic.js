import * as api from './api';

export const getEmployeeList = async () => {
    try {
        const response = await api.fetchEmployeeList();
        // Add any additional business logic if needed
        return response.data;
    } catch (error) {
        console.error('Error fetching employee list:', error);
        throw error;
    }
};


export const getAdminList = async () => {
    try {
        const response = await api.fetchAdminList();
        // Add any additional business logic if needed
        return response.data;
    } catch (error) {
        console.error('Error fetching admin list:', error);
        throw error;
    }
};
