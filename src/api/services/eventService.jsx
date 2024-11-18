import axiosInstance from "@/utils/axiosInstance";

export const fetchEvents = async () => {
  const response = await axiosInstance.get("/events");
  return response.data;
};

export const createEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post("/events", eventData);
    return response.data; // Return response data
  } catch (error) {
    throw error; // Let error be handled by custom hook
  }
};

export const updateEvent = async (id, eventData) => {
  const response = await axiosInstance.put(`/events/${id}`, eventData);
  return response.data;
};