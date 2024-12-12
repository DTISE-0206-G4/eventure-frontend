import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAvgStars = async (userId: number): Promise<number> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/average_stars`,
    {
      params: {
        userId: userId,
      },
    }
  );
  return data.data as number;
};

const useAvgStars = (userId: number) => {
  const {
    isLoading,
    error,
    data: avgStars,
    refetch,
  } = useQuery({
    queryKey: ["fetchAvgStars", userId],
    queryFn: async () => fetchAvgStars(userId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    avgStars,
    refetch,
  };
};
export default useAvgStars;
