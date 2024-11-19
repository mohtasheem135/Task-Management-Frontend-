import { useState, useEffect } from 'react';

const EventForm = ({ eventData, onSave }) => {
  // Use a single state object to manage all form fields
  const [formData, setFormData] = useState({
    eventId: '',
    eventName: '',
    isActive: false,
    description: '',
  });

  // Initialize the form with event data if available (for editing)
  useEffect(() => {
    if (eventData) {
      setFormData({
        eventId: eventData.id || '',
        eventName: eventData.name || '',
        isActive: eventData.isActive || false,
        description: eventData.description || '',
      });
    }
  }, [eventData]);

  // Generic change handler for all form fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox for isActive
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the entire formData object to the save handler
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {/* Event Name Input */}
      <div>
        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          id="eventName"
          name="eventName"
          type="text"
          value={formData.eventName}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
          required
        />
      </div>

      {/* Is Active Checkbox */}
      <div className="flex items-center">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={handleInputChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm font-medium text-gray-700">
          Active
        </label>
      </div>

      {/* Description Textbox */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {eventData ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
