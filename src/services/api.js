import axiosInstance from "./axiosInstance";

// Fetch

export const fetchEmployeeCoins = () => {
  return axiosInstance.get("/Coins/getemployeecoins");
};

export const fetchCoinsTransactionsList = () => {
  return axiosInstance.get("/Coins/getcoinstransactionslist");
};

export const fetchEmployeeList = (queryParams) => {
  return axiosInstance.get(`/Tasks/getemployeelist?${queryParams}`);
};

export const fetchAdminList = (queryParams) => {
  return axiosInstance.get(`/Tasks/getadminlist??${queryParams}`);
};

export const fetchTaskDetail = (taskId) => {
  return axiosInstance.get(`/Tasks/taskdetail?taskId=${taskId}`);
};

export const fetchTasksCategoryDPList = () => {
  return axiosInstance.get("/Tasks/gettaskscategorydplist");
};

export const fetchUserDropdownList = () => {
  return axiosInstance.get("/Tasks/getuserdropdownlist");
};

// Post

export const sendAddToCoinsAfterManagerReview = (formData) => {
  return axiosInstance.post("/Coins/addtocoinsaftermanagerreview", formData);
};

export const sendManagerUpdateCoinInCoinTable = (formData) => {
  return axiosInstance.post("/Coins/managerupdatecoinincointable", formData);
};

export const sendAddOrEditCategory = (formData) => {
  return axiosInstance.post("/Tasks/addoreditcategory", formData);
};

export const sendAddTask = async (formData) => {
  return await axiosInstance.post("/Tasks/addtask", formData);
};

export const sendEditTask = async (formData) => {
  return await axiosInstance.post("/Tasks/edittask", formData);
};

export const sendManagerUpdateTaskCoin = (formData) => {
  return axiosInstance.post("/Tasks/managerupdatetaskcoin", formData);
};

export const sendAssignedEmpApproveTask = (formData) => {
  return axiosInstance.post("/Tasks/assignedempapprovetask", formData);
};

export const sendAssignedEmpObjectTask = (formData) => {
  return axiosInstance.post("/Tasks/assignedempobjecttask", formData);
};

export const sendAssignedEmpSubmitTask = (formData) => {
  return axiosInstance.post("/Tasks/assignedempsubmittask", formData);
};

export const sendAssignerEmpSubmitTask = (formData) => {
  return axiosInstance.post("/Tasks/assignerempsubmittask", formData);
};

export const sendAssignerEmpObjectTask = (formData) => {
  return axiosInstance.post("/Tasks/assignerempobjecttask", formData);
};
