"use client";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDateAndTime } from "@/utils/basicUtilities";
import { NotebookPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "@/components/Forms/TaskForm";
import { useUpdateTask } from "@/api/hooks/Task/useUpdateTask";
import { useAddTask } from "@/api/hooks/Task/useAddTask";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/api/hooks/Event/useEvents";
import { useDispatch } from "react-redux";
import { setEvents } from "../redux/slices/EventSlice";

const page = () => {
  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.event)?.events;
  const { events, getEvents } = useEvents();
  const getEventById = (id) => {
    return events.find(event => event.id === id);
  };
  const selectedEvent = getEventById(currentEvent?.id);
  if(selectedEvent) {
    dispatch(setEvents(selectedEvent));
  }
  
  // Update Task
  const {
    updateExistingTask,
    isSubmitting: isUpdatingTask,
    error: updateError,
  } = useUpdateTask();
  // Add Task
  const {
    addTask,
    isSubmitting: isAddingTask,
    error: addTaskError,
  } = useAddTask();

  const handleUpdateTask = async (task) => {
    const data = {
      subtaskName: task.subtaskName,
      description: task.description,
      taskStatus: task.taskStatus,
      priority: task.priority,
      expectedCompletionTime: task.expectedCompletionTime,
    };
    try {
      await updateExistingTask(task.eventId, data);
      getEvents();
      alert("Task Updated successfully!");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleTaskCreation = async (task) => {
    const data = {
      subtaskName: task.subtaskName,
      description: task.description,
      taskStatus: task.taskStatus,
      priority: task.priority,
      expectedCompletionTime: task.expectedCompletionTime,
    };
    try {
      await addTask(currentEvent.id, data);
      getEvents();
      alert("Task added successfully!");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="w-full px-[50px]">
      <div className=" flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Create Task <NotebookPen className="cursor-pointer" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>Create Task here.</DialogDescription>
            </DialogHeader>
            <TaskForm onSave={handleTaskCreation} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-20 pt-[10px]">
        {currentEvent?.subtasks.map((tasks, index) => (
          <Card key={index} className="w-auto">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center py-3">
                  {tasks?.subtaskName}
                  <Dialog>
                    <DialogTrigger asChild>
                      <NotebookPen className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                          Edit your Task here.
                        </DialogDescription>
                      </DialogHeader>
                      <TaskForm taskData={tasks} onSave={handleUpdateTask} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardTitle>
              <CardDescription>{tasks?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h1>
                Status:{" "}
                {tasks?.taskStatus === "PENDING"
                  ? "Pending"
                  : tasks?.taskStatus === "NOT_COMPLETED"
                  ? "Not Completed"
                  : "Completed"}
              </h1>
              {tasks?.createdAt && (
                <h1>
                  Created At: {getDateAndTime(tasks?.createdAt).date} - (
                  {getDateAndTime(tasks?.createdAt).time})
                </h1>
              )}
              {tasks?.updatedAt && (
                <h1>
                  Updated At: {getDateAndTime(tasks?.updatedAt).date} - (
                  {getDateAndTime(tasks?.updatedAt).time})
                </h1>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Cancel</Button> */}
              {/* <Button onClick={() => handleClick(eventData)}>Enter</Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
