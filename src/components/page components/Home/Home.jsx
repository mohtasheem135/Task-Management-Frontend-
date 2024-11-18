"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEvents } from "@/api/hooks/Event/useEvents";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setEvents } from "@/app/redux/slices/EventSlice";
import {
  getDateAndTime,
  replaceSpacesWithUnderscores,
} from "@/utils/basicUtilities";
import EventForm from "@/components/Forms/EventForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NotebookPen } from "lucide-react";
import { useAddEvent } from "@/api/hooks/Event/useAddEvent";
import { useUpdateEvent } from "@/api/hooks/Event/useUpdateEvent";
import TaskForm from "@/components/Forms/TaskForm";
import { useAddTask } from "@/api/hooks/Task/useAddTask";

function HomeSection() {
  const { events, isLoading, error, getEvents } = useEvents();
  const {
    addEvent,
    isSubmitting: isEventAdding,
    error: addEventError,
  } = useAddEvent();
  const {
    updateExistingEvent,
    isSubmitting: isUpdating,
    error: updateError,
  } = useUpdateEvent();
  const {
    addTask,
    isSubmitting: isAddingTask,
    error: addTaskError,
  } = useAddTask();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (eventData) => {
    dispatch(setEvents(eventData));
    const eventName = replaceSpacesWithUnderscores(eventData?.eventName);
    router.push(`${eventName}`);
  };

  const handleEventUpdate = async (eventData) => {
    const data = {
      eventName: eventData.eventName,
      isActive: eventData.isActive,
      description: eventData.description,
    };
    try {
      await updateExistingEvent(eventData.eventId, data);
      getEvents();
      alert("Event Updated successfully!");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleEventCreation = async (eventData) => {
    const data = {
      eventName: eventData.eventName,
      isActive: eventData.isActive,
      description: eventData.description,
    };
    try {
      await addEvent(data);
      getEvents();
      alert("Event added successfully!");
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
      await addTask(task.eventId, data);
      getEvents();
      alert("Task added successfully!");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // return (
  //   <div className="px-[100px]">
  //     <div className="pt-[30px] flex justify-end items-center">
  //       <Dialog>
  //         <DialogTrigger asChild>
  //           {/* <NotebookPen className="cursor-pointer" /> */}
  //           <Button>
  //             Create Event <NotebookPen className="cursor-pointer" />
  //           </Button>
  //         </DialogTrigger>
  //         <DialogContent className="sm:max-w-[425px]">
  //           <DialogHeader>
  //             <DialogTitle>Edit Event</DialogTitle>
  //             <DialogDescription>Edit your Event here.</DialogDescription>
  //           </DialogHeader>
  //           <EventForm onSave={handleEventCreation} />
  //         </DialogContent>
  //       </Dialog>
  //     </div>
  //     <div className="grid grid-cols-3 gap-3 py-[40px]">
  //       {events.map((eventData, index) => {
  //         return (
  //           <Card key={eventData?.id} className="w-[350px]">
  //             <CardHeader>
  //               {/* <CardTitle>{eventData?.eventName}</CardTitle> */}
  //               <div className="flex justify-between items-center py-3">
  //                 {eventData?.eventName}
  //                 <Dialog>
  //                   <DialogTrigger asChild>
  //                     <NotebookPen className="cursor-pointer" />
  //                   </DialogTrigger>
  //                   <DialogContent className="sm:max-w-[425px]">
  //                     <DialogHeader>
  //                       <DialogTitle>Edit Event</DialogTitle>
  //                       <DialogDescription>
  //                         Edit your Event here.
  //                       </DialogDescription>
  //                     </DialogHeader>
  //                     <EventForm
  //                       eventData={eventData}
  //                       onSave={handleEventUpdate}
  //                     />
  //                   </DialogContent>
  //                 </Dialog>
  //               </div>
  //               <CardDescription>{eventData?.description}</CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <h1>
  //                 Status: {eventData?.isActive ? "Not Completed" : "Completed"}
  //               </h1>
  //               <h1>{eventData?.subtasks.length} task in this event</h1>
  //               {eventData?.createdAt && (
  //                 <h1>
  //                   Creation At: {getDateAndTime(eventData?.createdAt).date} - (
  //                   {getDateAndTime(eventData?.createdAt).time})
  //                 </h1>
  //               )}
  //               {eventData?.updatedAt && (
  //                 <h1>
  //                   Updated At: {getDateAndTime(eventData?.updatedAt).date} - (
  //                   {getDateAndTime(eventData?.updatedAt).time})
  //                 </h1>
  //               )}
  //             </CardContent>
  //             <CardFooter className="flex justify-between">
  //               {eventData?.subtasks.length == 0 ? (
  //                 <Dialog>
  //                   <DialogTrigger asChild>
  //                     <Button>
  //                       Add Task
  //                       <NotebookPen className="cursor-pointer" />
  //                     </Button>
  //                   </DialogTrigger>
  //                   <DialogContent className="sm:max-w-[425px]">
  //                     <DialogHeader>
  //                       <DialogTitle>Edit Task</DialogTitle>
  //                       <DialogDescription>
  //                         Edit your Task here.
  //                       </DialogDescription>
  //                     </DialogHeader>
  //                     <TaskForm
  //                       taskData={eventData?.id}
  //                       onSave={handleTaskCreation}
  //                     />
  //                   </DialogContent>
  //                 </Dialog>
  //               ) : (
  //                 <Button
  //                   // disabled={eventData?.subtasks.length == 0}
  //                   onClick={() => handleClick(eventData)}
  //                 >
  //                   Enter
  //                 </Button>
  //               )}
  //             </CardFooter>
  //           </Card>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
  return(
    <div className="w-full">
      Home
    </div>
  )
}

export default HomeSection;
