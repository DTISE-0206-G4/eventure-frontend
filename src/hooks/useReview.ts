import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSingleReview = async (
  accessToken: string,
  eventId: number
): Promise<Review> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        eventId: eventId,
      },
    }
  );
  return data.data as Review;
};

const useReview = (accessToken: string, eventId: number) => {
  const {
    isLoading,
    error,
    data: review,
    refetch,
  } = useQuery({
    queryKey: ["fetchSingleReview", accessToken, eventId],
    queryFn: async () => fetchSingleReview(accessToken, eventId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    review,
    refetch,
  };
};
export default useReview;
