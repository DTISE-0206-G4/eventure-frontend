"use client";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EventDatatableRequest } from "@/types/event";
import useEvents from "@/hooks/useEvents";
import useCategories from "@/hooks/useCategories";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import EventCard from "./EventCard";
import CustomSpinner from "@/common/CustomSpinner";
import { Dropdown, DropdownItem } from "flowbite-react";

// Helper function to debounce the search input
const useDebouncedSearch = (search: string, delay: number) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search, delay]);

  return debouncedSearch;
};

// EventList Component
const EventList: FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category");

  const debouncedSearch = useDebouncedSearch(search, 1000); // Use debounced search
  const paginationParams = {
    start: 0,
    length: 10,
    search: debouncedSearch,
    userId: null,
    category: paramCategory ?? "",
  };

  const {
    isLoading,
    error,
    data: eventsData,
    setParams,
  } = useEvents(paginationParams);
  const { categories } = useCategories();

  // Handlers for search and category filters
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams();
    params.set("category", category);
    router.push(`${pathname}?${params.toString()}`);
    setParams((prevParams: EventDatatableRequest) => ({
      ...prevParams,
      category: category,
    }));
  };

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

  useEffect(() => {
    setParams((prevParams: EventDatatableRequest) => ({
      ...prevParams,
      search: debouncedSearch,
    }));
  }, [debouncedSearch]);

  // Handling empty states and loading states
  if (error && !eventsData) return <div>Error</div>;
  if (isLoading || !eventsData) return <CustomSpinner />;

  const totalPages = Math.ceil(
    eventsData.recordsFiltered / paginationParams.length
  );

  return (
    <div className="w-full mx-5">
      {/* Header with search and category filter */}
      <div className="flex max-md:flex-col max-md:gap-2 md:justify-between md:items-center ">
        <div className="flex gap-4 items-center">
          <SearchBar search={search} handleSearch={handleSearch} />
          <Dropdown
            label={paramCategory ? paramCategory : "All Categories"}
            color="light"
            size="sm"
          >
            <DropdownItem onClick={() => handleCategorySelect("")}>
              All Categories
            </DropdownItem>
            {categories?.map((category) => (
              <DropdownItem
                onClick={() => handleCategorySelect(category.name)}
                key={category.id}
              >
                {category.name}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>

        {/* Pagination */}
        <div>
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
      </div>

      {/* Events listing */}
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

        {eventsData?.data.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            handleClick={handleEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
