import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://your-api-url.com', // Base URL for API requests
  timeout: 10000, // Optional timeout for requests
  headers: {
    'Content-Type': 'application/json', // Default content type
    // You can add other headers here, like authorization tokens if needed
  }
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add auth token before request is sent
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that is within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status code that falls outside the range of 2xx triggers this function
    // You can handle global errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
