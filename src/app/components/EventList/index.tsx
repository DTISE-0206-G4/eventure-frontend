"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useEvents from "@/hooks/useEvents";
import { Event, EventDatatableRequest } from "@/types/event";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import EventCard from "./EventCard";

const EventList: FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const paginationParams = {
    draw: 1,
    start: 0,
    length: 10,
    orderColumn: "id",
    orderDir: "asc",
    search: search,
    userId: null,
  };

  const {
    isLoading,
    error,
    data: eventsData,
    setParams,
  } = useEvents(paginationParams);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setParams((prevParams: any) => ({
        ...prevParams,
        search: search,
        start: 0,
      }));
      inputRef.current?.focus();
    }, 1000); // Set debounce delay (500ms)
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleClick = (eventId: number) => {
    router.push("/event/" + eventId);
  };

  const handleDataFromChild = (childData: EventDatatableRequest) => {
    setParams(childData);
  };

  if (error && !eventsData) return <div>Error</div>;
  if (isLoading || !eventsData) return <div>Loading...</div>;

  const totalPage = Math.ceil(
    eventsData.recordsFiltered / paginationParams.length
  );

  return (
    <div className="w-full mx-5">
      <div className="flex justify-between items-center">
        <SearchBar search={search} handleSearch={handleSearch} ref={inputRef} />
        <div>
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <Pagination
                paginationParams={paginationParams}
                totalPage={totalPage}
                page={page}
                setPage={setPage}
                sendDataToParent={handleDataFromChild}
              />
            </ul>
          </nav>
        </div>
      </div>

      <div className="my-5 flex flex-col gap-5">
        {eventsData?.data.length === 0 && (
          <div className="flex gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum hover:cursor-pointer hover:bg-azureish-white">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between">
                <div className="font-semibold">No Result</div>
              </div>
            </div>
          </div>
        )}

        {eventsData?.data.map((event: Event) => (
          <EventCard key={event.id} event={event} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
