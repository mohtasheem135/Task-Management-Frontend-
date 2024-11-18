import axiosInstance from "@/utils/axiosInstance";

export const createTask = async (id, taskData) => {
    try {
      const response = await axiosInstance.post(`/subtasks/${id}`, taskData);
      return response.data; // Return response data
    } catch (error) {
      throw error; // Let error be handled by custom hook
    }
  };

  export const updateTask = async (id, taskData) => {
    const response = await axiosInstance.put(`/subtasks/${id}`, taskData);
    return response.data;
  };