"use client";

// import { useEvents } from "@/api/hooks/Event/useEvents";
import { detectDevice } from '@/utils/detectDevice';
import { useEffect, useState } from "react";

function HomeSection() {
  // const { isLoading, error} = useEvents();

  const [device, setDevice] = useState("unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const detectedDevice = detectDevice(userAgent); // Call the utility function
    setDevice(detectedDevice);
  }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

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
  return <div className="w-full mt-11 ml-5">Task Management {device}</div>;
}

export default HomeSection;
