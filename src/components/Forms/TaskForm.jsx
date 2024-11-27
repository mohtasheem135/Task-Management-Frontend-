import { useState, useEffect } from "react";

const TaskForm = ({ taskData, onSave }) => {
  const [formData, setFormData] = useState({
    eventId: "",
    subtaskName: "",
    description: "",
    taskStatus: "PENDING",
    priority: "MEDIUM",
    expectedCompletionTime: "",
  });

  useEffect(() => {
    if (taskData) {
      setFormData({
        eventId: taskData.id || taskData || "",
        subtaskName: taskData.name || "",
        description: taskData.description || "",
        taskStatus: "PENDING",
        priority: taskData.priority || "MEDIUM",
        expectedCompletionTime: taskData.expectedCompletionTime || "",
      });
    }
  }, [taskData]);

  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);
    setMinDateTime(formattedNow);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {/* Task Name Input */}
      <div>
        <label
          htmlFor="subtaskName"
          className="block text-sm font-medium text-gray-700"
        >
          Task Name
        </label>
        <input
          id="subtaskName"
          name="subtaskName"
          type="text"
          value={formData.subtaskName}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
          required
        />
      </div>

      {/* Description Textbox */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
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

      {/* Status Selection */}
      {/* <div>
        <label
          htmlFor="taskStatus"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="taskStatus"
          name="taskStatus"
          value={formData.taskStatus}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
          required
        >
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="NOT_COMPLETED">Not Completed</option>
        </select>
      </div> */}

      {/* Priority Selection */}
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none"
          required
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      {/* Completion Date and Time */}
      <div>
        <label
          htmlFor="expectedCompletionTime"
          className="block text-sm font-medium text-gray-700"
        >
          Expected Completion Date & Time
        </label>
        <input
          id="expectedCompletionTime"
          name="expectedCompletionTime"
          type="datetime-local"
          min={minDateTime}
          value={formData.expectedCompletionTime}
          onChange={handleInputChange}
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
          {taskData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
