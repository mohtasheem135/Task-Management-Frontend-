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
  DialogClose,
  DialogContent,
  DialogDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import useWindowSize from "@/hooks/useWindowSize";
import CountdownTimer from "@/components/page components/Task/CountdownTimer";

const Page = () => {
  const { width, height } = useWindowSize();
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
  const {
    updateExistingTask,
    // isSubmitting: isUpdatingTask,
    // error: updateError,
  } = useUpdateTask();
  // Add Task
  const {
    addTask,
    // isSubmitting: isAddingTask,
    // error: addTaskError,
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
        {currentEvent?.subtasks.map((tasks, index) => (
          <Dialog>
            <DialogTrigger asChild>
              <Card key={index} className="w-full py-3 flex">
                <CardHeader className="w-[55%] px-2 py-0">
                  <CardTitle border-2 border-black>
                    <div className="flex justify-between items-center py-3 w-full">
                      {tasks?.subtaskName}
                    </div>
                  </CardTitle>
                  {/* <CardDescription className="">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="z-50" variant="outline">
                          View Details
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80"></PopoverContent>
                    </Popover>
                  </CardDescription> */}
                </CardHeader>
                <CardFooter className="w-[45%] flex flex-col justify-center items-center p-0">
                  <div className="mt-2">
                    <CountdownTimer
                      expectedCompletionTime={tasks.expectedCompletionTime}
                    />
                  </div>
                </CardFooter>
                {/* <CardContent> */}
                {/* <h1>
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
              )} */}
                {/* </CardContent> */}
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
                <Button className="w-[150px]">Yes</Button>
                <DialogClose className="">
                  <Button className="w-[150px]">Not Yet</Button>
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
