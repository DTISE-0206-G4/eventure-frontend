"use client";
import { FC, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import useEventsListOrg from "@/hooks/useEventListOrg";
import { useRouter } from "next/navigation";
import { Event, EventDatatableRequest } from "@/types/event";
import CustomSpinner from "@/common/CustomSpinner";
import EventContainer from "./components/EventContainer";
import Pagination from "./components/Pagination";
import { useSession } from "next-auth/react";

const OrganizerEventPage: FC = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data: session } = useSession();
  const paginationParams = {
    start: 0,
    length: 2,
    userId: parseInt(session?.user.id ?? "", 10),
    search: "",
    category: "",
  };
  const {
    isLoading,
    error,
    data: eventsData,
    setParams,
    refetch,
  } = useEventsListOrg(paginationParams);

  if (error && !eventsData) return <div>Error</div>;
  if (isLoading || !eventsData) return <CustomSpinner />;

  console.log("Events data:", eventsData.data);
  const totalPages = Math.ceil(
    eventsData.recordsFiltered / paginationParams.length
  );

  const handleEventClick = (eventId: number) => {
    router.push("/event/" + eventId);
  };
  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
    setParams((prevParams: EventDatatableRequest) => ({
      ...prevParams,
      start: (newPage - 1) * paginationParams.length,
    }));
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
      <div className="mb-2">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <Pagination
              paginationParams={paginationParams}
              totalPage={totalPages}
              page={page}
              setPage={handlePaginationChange}
            />
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-5">
        {
          eventsData.data.length === 0 && (
            <div className="text-center">No events found.</div>
          )
        }
        {eventsData?.data.map((event: Event) => (
          <EventContainer
            key={event.id}
            event={event}
            // discount={event.discount}
            handleClick={() => handleEventClick(event.id)}
            refetchEvents={refetch}
          />
        ))}
      </div>
    </>
  );
};
export default OrganizerEventPage;
