import { useState } from 'react';
import { updateTask } from '@/api/services/taskService';
import { handleApiErrors } from '@/utils/handleErrors';

export const useUpdateTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingTask = async (id, taskData) => {
    try {
      setIsSubmitting(true);
      setError(null); // Reset previous errors
      const response = await updateTask(id, taskData);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { updateExistingTask, isSubmitting, error };
};
