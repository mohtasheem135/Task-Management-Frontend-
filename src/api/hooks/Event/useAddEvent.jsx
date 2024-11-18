// src/hooks/useAddEvent.js
import { useState } from 'react';
// import { postEvent } from '../services/eventService';
import { handleApiErrors } from '@/utils/handleErrors';
import { createEvent } from '@/api/services/eventService';

export const useAddEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addEvent = async (eventData) => {
    try {
      setIsSubmitting(true);
      setError(null); // Reset previous errors
      const response = await createEvent(eventData);
      return response; // Return response on success
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
      throw err; // Re-throw error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addEvent, isSubmitting, error };
};
