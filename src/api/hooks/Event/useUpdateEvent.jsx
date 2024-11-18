// src/hooks/useUpdateEvent.js
import { useState } from 'react';
import { updateEvent } from '@/api/services/eventService';
import { handleApiErrors } from '@/utils/handleErrors';

export const useUpdateEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingEvent = async (id, eventData) => {
    try {
      setIsSubmitting(true);
      setError(null); // Reset previous errors
      const response = await updateEvent(id, eventData);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { updateExistingEvent, isSubmitting, error };
};
