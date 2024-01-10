import axiosInstance from './axiosInstance';

export const fetchEmployeeList = () => {
    return axiosInstance.get('/getemployeelist');
};


export const fetchAdminList = () => {
    return axiosInstance.get('/getadminlist');
};

export const fetchTaskDetail = (taskId) => {
    return axiosInstance.get(`/taskdetail?taskId=${taskId}`);
};


export const fetchTasksCategoryDPList = () => {
    return axiosInstance.get('/gettaskscategorydplist');
};


export const fetchUserDropdownList = () => {
    return axiosInstance.get('/getuserdropdownlist');
};