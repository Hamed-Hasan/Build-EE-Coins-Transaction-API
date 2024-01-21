import axiosInstance from "./axiosInstance";

// Fetch


export const fetchLocationsDropdown = () => {
  return axiosInstance.get("/Locations/locationsdropdown");
};


export const fetchProjectsDropdown = () => {
  return axiosInstance.get("/Projects/projectsdropdown");
};



export const fetchMyCoins = () => {
  return axiosInstance.get(`/Coins/getmycoins`);
};

export const fetchAdminCoinsTransactionsList = (queryParams) => {
  return axiosInstance.get(
    `/Coins/getAdmincoinstransactionslist?${queryParams}`
  );
};

export const fetchEmployeeCoins = (queryParams) => {
  return axiosInstance.get(`/Coins/getadmincoins?${queryParams}`);
};

export const fetchCoinsTransactionsList = (queryParams) => {
  return axiosInstance.get(`/Coins/getcoinstransactionslist?${queryParams}`);
};

export const fetchEmployeeList = (queryParams) => {
  return axiosInstance.get(`/Tasks/getemployeelist?${queryParams}`);
};

export const fetchAdminList = (queryParams) => {
  return axiosInstance.get(`/Tasks/getadminlist?${queryParams}`);
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


export const sendRequestMoneyByCoins = (formData) => {
  return axiosInstance.post("/Coins/requestmoneybycoins", formData);
};


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
  return axiosInstance.post("/Tasks/assignrdempsubmittask", formData);
};

export const sendAssignerEmpObjectTask = (formData) => {
  return axiosInstance.post("/Tasks/assignrdemprejecttask", formData);
};
