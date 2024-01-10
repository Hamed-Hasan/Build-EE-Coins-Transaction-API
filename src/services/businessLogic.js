import * as api from "./api";

export const getEmployeeList = async () => {
  try {
    const response = await api.fetchEmployeeList();
    // Add any additional business logic if needed
    return response.data;
  } catch (error) {
    console.error("Error fetching employee list:", error);
    throw error;
  }
};

export const getAdminList = async () => {
  try {
    const response = await api.fetchAdminList();
    // Add any additional business logic if needed
    return response.data;
  } catch (error) {
    console.error("Error fetching admin list:", error);
    throw error;
  }
};

export const getTaskDetail = async (taskId) => {
  try {
    const response = await api.fetchTaskDetail(taskId);
    // Add any additional business logic here
    return response.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    // Handle the error appropriately
    throw error;
  }
};

export const getTasksCategoryDPList = async () => {
  try {
    const response = await api.fetchTasksCategoryDPList();
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks category list:", error);
    throw error;
  }
};

export const getUserDropdownList = async () => {
  try {
    const response = await api.fetchUserDropdownList();
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error fetching user dropdown list:", error);
    throw error;
  }
};

export const postAddOrEditCategory = async (formData) => {
  try {
    const response = await api.sendAddOrEditCategory(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending category data:", error);
    throw error;
  }
};

export const postAddTask = async (formData) => {
  try {
    const response = await api.sendAddTask(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending task data:", error);
    throw error;
  }
};

export const postManagerUpdateTaskCoin = async (formData) => {
  try {
    const response = await api.sendManagerUpdateTaskCoin(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending task cion data:", error);
    throw error;
  }
};

export const postAssignedEmpApproveTask = async (formData) => {
  try {
    const response = await api.sendAssignedEmpApproveTask(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending assigned employee approve task:", error);
    throw error;
  }
};

export const postAssignedEmpObjectTask = async (formData) => {
  try {
    const response = await api.sendAssignedEmpObjectTask(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending assigned employee object task:", error);
    throw error;
  }
};

export const postAssignedEmpSubmitTask = async (formData) => {
  try {
    const response = await api.sendAssignedEmpSubmitTask(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending assigned employee submit task:", error);
    throw error;
  }
};

export const postAssignerEmpSubmitTask = async (formData) => {
  try {
    const response = await api.sendAssignerEmpSubmitTask(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending assigner employee submit task:", error);
    throw error;
  }
};

export const postAssignerEmpObjectTask = async (formData) => {
  try {
    const response = await api.sendAssignerEmpObjectTask(formData);
    // Additional business logic can be added here
    return response.data;
  } catch (error) {
    console.error("Error sending assigner employee object task:", error);
    throw error;
  }
};
