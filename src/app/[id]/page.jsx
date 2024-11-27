"use client";
import { useSelector } from "react-redux";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getDateAndTime } from "@/utils/basicUtilities";
import { NotebookPen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "@/components/Forms/TaskForm";
import { useUpdateTask } from "@/api/hooks/Task/useUpdateTask";
import { useBatchUpdateTask } from "@/api/hooks/Task/useBatchUpdateTask";
import { useAddTask } from "@/api/hooks/Task/useAddTask";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/api/hooks/Event/useEvents";
import { useDispatch } from "react-redux";
import { setEvents } from "../redux/slices/EventSlice";
import { useIsMobile } from "@/hooks/use-mobile";
import CountdownTimer from "@/components/page components/Task/CountdownTimer";
import { useEffect, useState } from "react";

const Page = () => {
  const dispatch = useDispatch();
  const currentEvent = useSelector((state) => state.event)?.events;
  const { events, getEvents } = useEvents();
  const isMobile = useIsMobile();
  const getEventById = (id) => {
    return events.find((event) => event.id === id);
  };
  const selectedEvent = getEventById(currentEvent?.id);
  if (selectedEvent) {
    dispatch(setEvents(selectedEvent));
  }

  // Update Task
  const { updateExistingTask } = useUpdateTask();

  // Batch Update Task
  const { batchUpdateExistingTasks } = useBatchUpdateTask();

  // Add Task
  const { addTask } = useAddTask();

  const handleUpdateTask = async (task) => {
    const data = {
      name: task.subtaskName,
      description: task.description,
      status: task.taskStatus,
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
  const updateTaskToCompleted = async (tasks) => {
    const data = {
      name: tasks.name,
      description: tasks.description,
      status: "COMPLETED",
      priority: tasks.priority,
      expectedCompletionTime: tasks.expectedCompletionTime,
    };
    try {
      await updateExistingTask(tasks.id, data);
      getEvents();
      alert("Successfully Completed the Task!");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // Functionality to filter out all the overdue task and mark it Not Completed at the same time ************
  const getOverdueTasks = (tasks) => {
    const overdueTasks = tasks.filter((task) => {
      const now = new Date();
      const dueTime = new Date(task.expectedCompletionTime);
      return now > dueTime && task.status === "PENDING";
    });

    const formattedOverdueTasks = {
      tasks: overdueTasks.map((task) => ({
        id: task.id,
        name: task.subtaskName || task.name,
        description: task.description,
        expectedCompletionTime: task.expectedCompletionTime,
        priority: task.priority,
        status: "NOT_COMPLETED",
      })),
    };

    return formattedOverdueTasks;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [overdueTasks, setOverdueTasks] = useState({ tasks: [] });

  useEffect(() => {
    if (currentEvent && currentEvent.tasks) {
      const updateOverdueTasks = async () => {
        const overdue = getOverdueTasks(currentEvent.tasks);

        setOverdueTasks(overdue);
        if (overdue.tasks.length > 0) {
          try {
            await batchUpdateExistingTasks(overdue);
            getEvents();
            alert("All Statuses Updated successfully!");
          } catch (err) {
            console.error("xxxxxx Submission error:", err);
          }
        }
      };

      updateOverdueTasks();
    }
  }, []);

  // ****************

  const handleTaskCreation = async (task) => {
    const data = {
      name: task.subtaskName,
      description: task.description,
      status: task.taskStatus,
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

  // Functionality to determine the Status of the task to update the background color efficiently**********
  function determineTaskStatus(task) {
    const { status, expectedCompletionTime } = task;
    const now = new Date();
    const dueTime = new Date(expectedCompletionTime);
    if (status === "COMPLETED") {
      return "Completed";
    } else if (now > dueTime) {
      return "Not Completed";
    } else {
      return "Pending";
    }
  }

  const getCardColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-300";
      case "Pending":
        return "bg-yellow-300";
      case "Not Completed":
        return "bg-red-300";
      default:
        return "bg-gray-200";
    }
  };

  // ***********

  return (
    <div className="w-[100vw] sm:w-[calc(100vw-18rem)] px-[30px] pb-[50px]">
      <div className="border-0 border-black flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add Task <NotebookPen className="cursor-pointer" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription>Add Task here.</DialogDescription>
            </DialogHeader>
            <TaskForm onSave={handleTaskCreation} />
          </DialogContent>
        </Dialog>
      </div>
      <div
        className={`${
          !isMobile
            ? "grid grid-cols-3 gap-20 pt-[10px]"
            : "grid grid-cols-1 gap-5 pt-[20px] "
        }`}
      >
        {currentEvent?.tasks.map((tasks, index) => (
          <Dialog key={tasks.id}>
            <DialogTrigger asChild>
              <Card
                key={index}
                className={`w-full py-3 flex ${getCardColor(
                  determineTaskStatus(tasks)
                )}`}
              >
                <CardHeader className="w-[55%] px-2 py-0">
                  <CardTitle border-2 border-black>
                    <div className="flex justify-between items-center py-3 w-full">
                      {tasks?.name}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardFooter className="w-[45%] flex flex-col justify-center items-center p-0">
                  <div className="mt-2">
                    <CountdownTimer
                      expectedCompletionTime={tasks.expectedCompletionTime}
                    />
                  </div>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <div className="flex justify-between items-center ">
                <p className="font-bold">Description</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>
                      Edit
                      <NotebookPen className="cursor-pointer" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                      <DialogDescription>Edit your Task</DialogDescription>
                    </DialogHeader>
                    <TaskForm taskData={tasks} onSave={handleUpdateTask} />
                  </DialogContent>
                </Dialog>
              </div>
              <p className="font-normal ">{tasks?.description}</p>
              <div className="bg-green-200 rounded-lg py-3 px-3 mt-">
                <p className="mb-1">
                  {tasks?.createdAt && (
                    <h1>
                      Created At: {getDateAndTime(tasks?.createdAt).date} - (
                      {getDateAndTime(tasks?.createdAt).time})
                    </h1>
                  )}
                </p>
                <p>
                  {tasks?.updatedAt && (
                    <h1>
                      Updated At: {getDateAndTime(tasks?.updatedAt).date} - (
                      {getDateAndTime(tasks?.updatedAt).time})
                    </h1>
                  )}
                </p>
              </div>
              <h1>Have you completed this task?</h1>
              <div className="flex justify-between items-center">
                <Button
                  onClick={()=>updateTaskToCompleted(tasks)}
                  className="w-[150px]"
                >
                  Yes
                </Button>
                <DialogClose className="">
                  <Button className="w-[150px] bg-[#fc0303]">Not Yet</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Page;
