import { useState, useEffect, useCallback } from "react";
import { fetchEvents } from "../../services/eventService";
import { handleApiErrors } from "@/utils/handleErrors";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      const errorMessage = handleApiErrors(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

   useEffect(() => {
    getEvents(); // Fetch events on component mount
  }, [getEvents]);

  return { events, isLoading, error, getEvents };
};
