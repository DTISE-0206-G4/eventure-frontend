import { AnalyticsResponse } from "@/types/analytic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchAnalytics = async (
  accessToken: string,
  range: number
): Promise<AnalyticsResponse> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/analytic`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        range: range,
      },
    }
  );
  return data.data as AnalyticsResponse;
};

const useAnalytics = (accessToken: string, rangeProp: number) => {
  const [range, setRange] = useState(rangeProp);
  const {
    isLoading,
    error,
    data: analyticsData,
  } = useQuery({
    queryKey: ["fetchAnalytics", range],
    queryFn: async () => fetchAnalytics(accessToken, range),
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });
  return {
    isLoading,
    error,
    analyticsData,
    range,
    setRange,
  };
};
export default useAnalytics;
