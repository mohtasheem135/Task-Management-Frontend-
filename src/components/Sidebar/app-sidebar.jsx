import { FilePenLine, HomeIcon, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEvents } from "@/api/hooks/Event/useEvents";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setEvents } from "@/app/redux/slices/EventSlice";
import { replaceSpacesWithUnderscores } from "@/utils/basicUtilities";
import EventForm from "../Forms/EventForm";
import { useAddEvent } from "@/api/hooks/Event/useAddEvent";
import { useUpdateEvent } from "@/api/hooks/Event/useUpdateEvent";
import Link from "next/link";
import { useEffect, useState } from "react";
import { detectDevice } from "@/utils/detectDevice";
import { ModeToggle } from "./ModeToggle";

export function AppSidebar() {
  // const {
  //   state,
  //   open,
  //   setOpen,
  //   openMobile,
  //   setOpenMobile,
  //   isMobile,
  //   toggleSidebar,
  // } = useSidebar();

  const { events, isLoading, error, getEvents } = useEvents();
  const dispatch = useDispatch();
  const router = useRouter();

  // Add Event
  const {
    addEvent,
    // isSubmitting: isEventAdding,
    // error: addEventError,
  } = useAddEvent();

  // Update Event
  const {
    updateExistingEvent,
    // isSubmitting: isUpdating,
    // error: updateError,
  } = useUpdateEvent();

  const handleClick = (eventData) => {
    dispatch(setEvents(eventData));
    const eventName = replaceSpacesWithUnderscores(eventData?.eventName);
    router.push(`${eventName}`);
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

  // return (
  //   <Sidebar collapsible="offcanvas" variant="floating">
  //     {/* <SidebarHeader>
  //       <SidebarMenu>
  //         <SidebarMenuItem> ME</SidebarMenuItem>
  //       </SidebarMenu>
  //     </SidebarHeader> */}

  //     <SidebarContent>
  //       <SidebarGroup>
  //         <SidebarGroupLabel>Add Event</SidebarGroupLabel>
  //         <SidebarGroupAction title="Add Event">
  //           <Plus /> <span className="sr-only">Add Project</span>
  //         </SidebarGroupAction>
  //         <SidebarGroupContent />
  //       </SidebarGroup>

  //       {/* <SidebarGroup> */}
  //       <SidebarGroupLabel>All the Events</SidebarGroupLabel>
  //       {events.map((eventData) => (
  //         <Collapsible key={eventData.id} className="group/collapsible">
  //           <CollapsibleTrigger asChild>
  //             <SidebarMenuButton>
  //               <NotebookPen className="cursor-pointer" />
  //               {eventData?.eventName}
  //               <SidebarMenuBadge className="mr-[35px]">
  //                 <Button className="rounded-full px-2 py-2 h-0 w-0 text-[10px]">
  //                   {eventData?.subtasks.length}
  //                 </Button>
  //               </SidebarMenuBadge>
  //               <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
  //             </SidebarMenuButton>
  //           </CollapsibleTrigger>

  //           <CollapsibleContent>
  //             <SidebarMenuSub>
  //               {eventData?.subtasks.map((item) => (
  //                 <SidebarMenuSubItem key={item.id}>
  //                   <SidebarMenuButton
  //                     className={`${
  //                       item?.taskStatus === "PENDING"
  //                         ? "bg-gray-300 hover:bg-gray-300"
  //                         : item?.taskStatus === "COMPLETED"
  //                         ? "bg-green-300 hover:bg-green-300"
  //                         : "bg-red-300 hover:bg-red-300"
  //                     } `}
  //                   >
  //                     {/* <a> */}
  //                       <span onClick={()=> handleClick(eventData)}>{item?.subtaskName}</span>
  //                     {/* </a> */}
  //                     <SidebarMenuBadge className="mr-[15px]">
  //                       <Button className=" px-7 py-2 h-0 w-0 text-[10px]">
  //                         {item?.priority}
  //                       </Button>
  //                     </SidebarMenuBadge>
  //                   </SidebarMenuButton>
  //                 </SidebarMenuSubItem>
  //               ))}
  //             </SidebarMenuSub>
  //           </CollapsibleContent>
  //         </Collapsible>
  //       ))}

  //       {/* Good Till Here */}

  //     </SidebarContent>
  //   </Sidebar>
  // );

  const [device, setDevice] = useState("unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const detectedDevice = detectDevice(userAgent); // Call the utility function
    setDevice(detectedDevice);
  }, []);

  if (isLoading && !device) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="inset"
      side={`${device === "mobile" ? "left" : "left"}`}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center">
            <Link href="/">
              <HomeIcon />
            </Link>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupLabel className="shadow-lg px-3 py-6">
            Add Event
          </SidebarGroupLabel>
          <SidebarGroupAction
            className="w-9 h-9 border-dashed border-2 border-black"
            title="Add Event"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Plus className="cursor-pointer " />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Event</DialogTitle>
                  <DialogDescription>Add a new Event here.</DialogDescription>
                </DialogHeader>
                <EventForm onSave={handleEventCreation} />
              </DialogContent>
            </Dialog>
          </SidebarGroupAction>
          <SidebarGroupContent />
        </SidebarGroup> */}

        <SidebarMenu className="px-2 py-2 shadow-xl rounded-lg">
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton>Add Event</SidebarMenuButton>
            <div className="mr-2 border-2 border-dashed border-black px-[3px] py-[3px] rounded-lg">
              <Dialog>
                <DialogTrigger asChild>
                  <span >
                    <Plus className="cursor-pointer" size={22} />
                  </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-full max-w-full z-50 p-4 sm:rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogDescription>Add a new Event here.</DialogDescription>
                  </DialogHeader>
                  <EventForm onSave={handleEventCreation} />
                </DialogContent>
              </Dialog>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroupLabel>List of Events</SidebarGroupLabel>
        <SidebarMenu className="px-2">
          {events.map((eventData) => (
            <SidebarMenuItem
              className={`${
                eventData.isActive
                  ? "bg-green-300 hover:bg-green-300"
                  : "bg-red-300 hover:bg-red-300"
              } px-2 py-4 rounded-lg mb-1 flex items-center`}
              key={eventData.id}
            >
              <SidebarMenuButton
                onClick={() => handleClick(eventData)}
                key={eventData?.id}
                className={``}
              >
                {eventData?.eventName}
                <SidebarMenuBadge className="mr-[35px]">
                  <Button className="rounded-full px-2 py-2 h-0 w-0 text-[10px]">
                    {eventData?.subtasks.length}
                  </Button>
                </SidebarMenuBadge>
              </SidebarMenuButton>
              {/* <SidebarMenuAction className="w-9 h-9" title="Edit Event"> */}
              <div>
                <Dialog>
                  <DialogTrigger className=" rounded-full" asChild>
                    <span>
                      <FilePenLine className="cursor-pointer" size={22} />
                    </span>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Event</DialogTitle>
                      <DialogDescription>
                        Edit your Event here.
                      </DialogDescription>
                    </DialogHeader>
                    <EventForm
                      eventData={eventData}
                      onSave={handleEventUpdate}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              {/* </SidebarMenuAction> */}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
