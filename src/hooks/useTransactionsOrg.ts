import {
  TransactionDatatableResponse,
  TransactionsRequestOrg,
} from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchTransactionsOrg = async (
  accessToken: string,
  params: TransactionsRequestOrg
): Promise<TransactionDatatableResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/event`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params,
    }
  );
  return data.data as TransactionDatatableResponse;
};

const useTransactionsOrg = (
  accessToken: string,
  props?: Partial<TransactionsRequestOrg>
) => {
  const [params, setParams] = useState<TransactionsRequestOrg>({
    start: props?.start ?? 0,
    length: props?.length ?? 10,
    eventId: props?.eventId ?? 0,
  });
  const {
    isLoading,
    error,
    data: transactions,
    refetch,
  } = useQuery({
    queryKey: ["fetchTransactionsOrg", accessToken, params],
    queryFn: async () => fetchTransactionsOrg(accessToken, params),
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
export default useTransactionsOrg;
