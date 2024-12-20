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
    // draw: props?.draw ?? 1,
    start: props?.start ?? 0,
    length: props?.length ?? 10,
    // orderColumn: props?.orderColumn ?? "id",
    // orderDir: props?.orderDir ?? "asc",
    search: props?.search ?? "",
    userId: props?.userId ?? null,
    category:  "",

  });
  //   setParams({ ...params, ...props });

  const {
    isLoading,
    error,
    data: data,
    refetch
  } = useQuery({
    queryKey: ["fetchEventsOrg", params],
    queryFn: async () =>  fetchEvents(params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000
  });
  return {
    isLoading,
    error,
    data,
    refetch,
    params,
    setParams,
  };
};
export default useEvents;
