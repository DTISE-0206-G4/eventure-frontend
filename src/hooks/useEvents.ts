import { EventDatatableRequest, EventDatatableResponse } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchEvents = async (
  params: EventDatatableRequest
): Promise<EventDatatableResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/datatable`,
    {
      params,
    }
  );
  return data.data as EventDatatableResponse;
};

const useEvents = (props?: Partial<EventDatatableRequest>) => {
  const [params, setParams] = useState<EventDatatableRequest>({
    start: props?.start ?? 0,
    length: props?.length ?? 10,
    search: props?.search ?? "",
    userId: props?.userId ?? null,
    category: props?.category ?? "",
  });
  //   setParams({ ...params, ...props });

  const {
    isLoading,
    error,
    data: data,
  } = useQuery({
    queryKey: ["fetchEvents", params],
    queryFn: async () => fetchEvents(params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    data,
    params,
    setParams,
  };
};
export default useEvents;
