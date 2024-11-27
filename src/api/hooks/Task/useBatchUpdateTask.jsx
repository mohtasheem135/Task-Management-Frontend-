import { useState } from 'react';
import { batchUpdateTask } from '@/api/services/taskService';
import { handleApiErrors } from '@/utils/handleErrors';

export const useBatchUpdateTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const batchUpdateExistingTasks = async (taskData) => {
    try {
      setIsSubmitting(true);
      setError(null); // Reset previous errors
      const response = await batchUpdateTask(taskData);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { batchUpdateExistingTasks, isSubmitting, error };
};
