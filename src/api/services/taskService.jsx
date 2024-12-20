import axiosInstance from "@/utils/axiosInstance";

export const createTask = async (id, taskData) => {
    try {
      const response = await axiosInstance.post(`/events/${id}/tasks`, taskData);
      return response.data; // Return response data
    } catch (error) {
      throw error; // Let error be handled by custom hook
    }
  };

  export const updateTask = async (id, taskData) => {
    const response = await axiosInstance.put(`/tasks/${id}`, taskData);
    return response.data;
  };

  export const batchUpdateTask = async (taskData) => {
    const response = await axiosInstance.put(`/tasks/batch`, taskData);
    return response.data;
  };