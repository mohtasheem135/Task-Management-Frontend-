// General error handler for API calls
export const handleApiErrors = (error) => {
    if (error.response) {
      // Server responded with a status code outside of 2xx
      const statusCode = error.response.status;
  
      switch (statusCode) {
        case 400:
          return 'Bad Request. Please check the data you submitted.';
        case 401:
          // Handle unauthorized errors (e.g., token expired)
          return 'Unauthorized. Please login again.';
        case 403:
          return 'Forbidden. You do not have permission to perform this action.';
        case 404:
          return 'Resource not found.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    } else if (error.request) {
      // No response was received from the server
      return 'No response from the server. Please check your network connection.';
    } else {
      // Something else happened in setting up the request
      return 'An error occurred while setting up the request.';
    }
  };
  