// src/hooks/useAddEvent.js
import { useState } from 'react';
// import { postEvent } from '../services/eventService';
import { handleApiErrors } from '@/utils/handleErrors';
import { createTask } from '@/api/services/taskService';

export const useAddTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addTask = async (id, taskData) => {
    try {
      setIsSubmitting(true);
      setError(null); // Reset previous errors
      const response = await createTask(id, taskData);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addTask, isSubmitting, error };
};
