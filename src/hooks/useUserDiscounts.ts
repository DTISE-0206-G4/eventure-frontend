import { UserDiscountRespond } from "@/types/userDiscountType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserDiscounts = async (
  accessToken: string
): Promise<UserDiscountRespond[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/discount`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as UserDiscountRespond[];
};

const useUserDiscounts = (accessToken: string) => {
  const {
    isLoading,
    error,
    data: discounts,
    refetch,
  } = useQuery({
    queryKey: ["fetchUserDiscounts", accessToken],
    queryFn: async () => fetchUserDiscounts(accessToken),
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
export default useUserDiscounts;
