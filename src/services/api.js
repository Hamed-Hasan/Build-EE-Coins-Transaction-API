import axiosInstance from './axiosInstance';

export const fetchEmployeeList = () => {
    return axiosInstance.get('/Tasks/getemployeelist');
};


export const fetchAdminList = () => {
    return axiosInstance.get('/Tasks/getadminlist');
};
