import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInvoice = async (
  accessToken: string,
  transactionId: number
): Promise<Transaction> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data.data as Transaction;
};

const useInvoice = (accessToken: string, transactionId: number) => {
  const {
    isLoading,
    error,
    data: transaction,
    refetch,
  } = useQuery({
    queryKey: ["fetchInvoice", accessToken, transactionId],
    queryFn: async () => fetchInvoice(accessToken, transactionId),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    transaction,
    refetch,
  };
};
export default useInvoice;
