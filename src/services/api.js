import axiosInstance from './axiosInstance';

export const fetchEmployeeList = () => {
    return axiosInstance.get('/Tasks/getemployeelist');
};
