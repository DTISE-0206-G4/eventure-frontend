import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEvent = async (eventId: number): Promise<Event> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/${eventId}`
  );
  return data.data as Event;
};

const useEvent = (eventId: number) => {
  const {
    isLoading,
    error,
    data: event,
  } = useQuery({
    queryKey: ["fetchEvent", eventId],
    queryFn: async () => fetchEvent(eventId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    event,
  };
};
export default useEvent;
