import {
  FilePenLine,
  HomeIcon,
  Plus,
} from "lucide-react";
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
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <HomeIcon />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="shadow-lg px-3 py-6">Add Event</SidebarGroupLabel>
          <SidebarGroupAction className="w-9 h-9 border-dashed border-2 border-black" title="Add Event">
            <Dialog>
              <DialogTrigger asChild>
                {/* <NotebookPen className="cursor-pointer" /> */}
                  <Plus className="cursor-pointer " />
                {/* <Button className="w-3 h-8 " variant={"outline"}>
                </Button> */}
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
        </SidebarGroup>

        <SidebarGroupLabel>List of Events</SidebarGroupLabel>
        <SidebarMenu>
          {events.map((eventData) => (
            <SidebarMenuItem key={eventData.id}>
              <SidebarMenuButton
                onClick={() => handleClick(eventData)}
                key={eventData?.id}
                className={`${
                  eventData.isActive
                    ? "bg-green-300 hover:bg-green-300"
                    : "bg-red-300 hover:bg-red-300"
                } px-3 py-6`}
              >
                {/* <NotebookPen className="cursor-pointer" /> */}

                {eventData?.eventName}
                <SidebarMenuBadge className="mr-[35px]">
                  <Button className="rounded-full px-2 py-2 h-0 w-0 text-[10px]">
                    {eventData?.subtasks.length}
                  </Button>
                </SidebarMenuBadge>
              </SidebarMenuButton>
              <SidebarMenuAction className="w-9 h-9" title="Edit Event">
                <Dialog>
                  <DialogTrigger className=" rounded-full" asChild>
                    <span>
                      <FilePenLine className="cursor-pointer" size={18} />
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
              </SidebarMenuAction>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
