"use client";
import { FC, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faClock,
  faLocationDot,
  faSearch,
  faUpRightFromSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Modal, Button } from "flowbite-react";
import Link from "next/link";
import TicketCard from "./TicketCard";
import useEventsListOrg from "@/hooks/useEventListOrg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Event, EventDatatableRequest } from "@/types/event";
import CustomSpinner from "@/common/CustomSpinner";
import ActionButton from "@/app/(user_dashboard)/organizer_event/ActionButton";
import EventContainer from "./EventContainer";

const OrganizerEventPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const router = useRouter();

  

  const {
    isLoading,
    error,
    data: eventsData,
    refetch,
    setParams,
  } = useEventsListOrg();

  

  // const router = useRouter();
  if (error && !eventsData) return <div>Error</div>;
  if (isLoading || !eventsData) return <CustomSpinner />;
  
  console.log("Events data:", eventsData.data);

  const handleEventClick = (eventId: number) => {
    router.push("/event/" + eventId);
  };

  
  


  return (
    <>
      <div className="flex justify-between">
        <div className="font-semibold text-xl">My Events</div>
        <Link href="/organizer_event/add_event">
          <button className="bg-true-blue rounded-lg py-2 px-5 text-white flex gap-2">
            <FontAwesomeIcon
              className="w-[25px] h-[25px] shrink-0 text-white"
              icon={faPlus}
            />
            <div>Add Event</div>
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        {eventsData?.data.map((event: Event) => (
          <EventContainer key={event.id} event={event} handleClick={handleEventClick} refetchEvents={refetch} />
        ))}
      </div>

    
    </>
  );
};
export default OrganizerEventPage;
