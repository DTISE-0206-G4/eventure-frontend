import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchReviews = async (eventId: number): Promise<Review[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`,
    {
      params: {
        eventId: eventId,
      },
    }
  );
  return data.data as Review[];
};

const useReviews = (eventId: number) => {
  const {
    isLoading,
    error,
    data: reviews,
    refetch,
  } = useQuery({
    queryKey: ["fetchReviews", eventId],
    queryFn: async () => fetchReviews(eventId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    reviews,
    refetch,
  };
};
export default useReviews;
