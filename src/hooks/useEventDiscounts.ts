import { EventDiscountRespond } from "@/types/eventDiscountType";
import { UserDiscountRespond } from "@/types/userDiscountType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEventDiscounts = async (
  accessToken: string,
  eventId: number
): Promise<EventDiscountRespond[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event_discount`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        eventId: eventId,
      },
    }
  );
  return data.data as EventDiscountRespond[];
};

const useEventDiscounts = (accessToken: string, eventId: number) => {
  const {
    isLoading,
    error,
    data: discounts,
  } = useQuery({
    queryKey: ["fetchEventDiscounts", accessToken],
    queryFn: async () => fetchEventDiscounts(accessToken, eventId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    discounts,
  };
};
export default useEventDiscounts;
