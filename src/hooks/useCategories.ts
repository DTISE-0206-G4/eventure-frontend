import { Category } from "@/types/event";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async (accessToken: string): Promise<Category[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/categories`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as Category[];
};

const useCategories = (accessToken: string) => {
  const {
    isLoading,
    error,
    data: categories,
    refetch,
  } = useQuery({
    queryKey: ["fetchCategories", accessToken],
    queryFn: async () => fetchCategories(accessToken),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    categories,
    refetch,
  };
};
export default useCategories;
