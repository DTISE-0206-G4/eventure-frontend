import {
  TransactionDatatableResponse,
  TransactionsRequest,
} from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchTransactions = async (
  accessToken: string,
  params: TransactionsRequest
): Promise<TransactionDatatableResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/datatable`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as TransactionDatatableResponse;
};

const useTransactions = (
  accessToken: string,
  props?: Partial<TransactionsRequest>
) => {
  const [params, setParams] = useState<TransactionsRequest>({
    start: props?.start ?? 0,
    length: props?.length ?? 10,
  });
  const {
    isLoading,
    error,
    data: transactions,
    refetch,
  } = useQuery({
    queryKey: ["fetchTransactions", accessToken, params],
    queryFn: async () => fetchTransactions(accessToken, params),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    transactions,
    refetch,
    params,
    setParams,
  };
};
export default useTransactions;
