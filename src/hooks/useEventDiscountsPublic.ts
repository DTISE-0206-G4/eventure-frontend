import { EventDiscountResponse } from "@/types/eventDiscountType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEventDiscounts = async (
  accessToken: string,
  eventId: number
): Promise<EventDiscountResponse[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event_discount/public`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        eventId: eventId,
      },
    }
  );
  return data.data as EventDiscountResponse[];
};

const useEventDiscountsPublic = (accessToken: string, eventId: number) => {
  const {
    isLoading,
    error,
    data: discounts,
    refetch,
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
    refetch,
  };
};
export default useEventDiscountsPublic;
