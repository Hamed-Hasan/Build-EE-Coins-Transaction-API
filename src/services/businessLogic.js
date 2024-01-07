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


export const getTaskDetail = async (taskId) => {
    try {
        const response = await api.fetchTaskDetail(taskId);
        // Add any additional business logic here
        return response.data;
    } catch (error) {
        console.error('Error fetching task details:', error);
        // Handle the error appropriately
        throw error;
    }
};