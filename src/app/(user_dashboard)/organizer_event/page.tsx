"use client";
import { FC } from "react";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import useEventsListOrg from "@/hooks/useEventListOrg";
import { useRouter } from "next/navigation";
import { Event} from "@/types/event";
import CustomSpinner from "@/common/CustomSpinner";
import EventContainer from "./components/EventContainer";

const OrganizerEventPage: FC = () => {

  const router = useRouter();

  

  const {
    isLoading,
    error,
    data: eventsData,
    refetch,
  } = useEventsListOrg();

  if (error && !eventsData) return <div>Error</div>;
  if (isLoading || !eventsData) return <CustomSpinner />;
  
  console.log("Events data:", eventsData.data);

  const handleEventClick = (eventId: number) => {
    router.push("/event/" + eventId);
  };

  return (
    <>
      <div className="flex justify-between mb-5">
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
          <EventContainer key={event.id} event={event} handleClick={()=> handleEventClick(event.id)} refetchEvents={refetch} />
        ))}
      </div>
    </>
  );
};
export default OrganizerEventPage;
