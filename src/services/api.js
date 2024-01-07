import axiosInstance from './axiosInstance';

export const fetchEmployeeList = () => {
    return axiosInstance.get('/Tasks/getemployeelist');
};


export const fetchAdminList = () => {
    return axiosInstance.get('/Tasks/getadminlist');
};

export const fetchTaskDetail = (taskId) => {
    return axiosInstance.get(`/Tasks/taskdetail?taskId=${taskId}`);
};


export const fetchTasksCategoryDPList = () => {
    return axiosInstance.get('/Tasks/gettaskscategorydplist');
};