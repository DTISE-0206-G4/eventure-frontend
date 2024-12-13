"use client";
import CustomSpinner from "@/common/CustomSpinner";
import useAnalytics from "@/hooks/useAnalytics";
import { RevenueData, TicketSoldData } from "@/types/analytic";
import { faMoneyBill, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownItem } from "flowbite-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPointTicketSold {
  timeUnit: string;
  ticketsSold: number;
}
interface DataPointRevenue {
  timeUnit: string;
  revenue: number;
}

const AnalyticsPage: FC = () => {
  const { data: session } = useSession();
  const { error, isLoading, analyticsData, range, setRange } = useAnalytics(
    session?.accessToken as string,
    1
  );

  if (!analyticsData) {
    return <CustomSpinner />;
  }

  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  const dataTicketSold: DataPointTicketSold[] =
    analyticsData.ticketSoldData.map((item: TicketSoldData) => ({
      timeUnit: item.timeUnit,
      ticketsSold: item.ticketsSold,
    }));

  const dataRevenue: DataPointRevenue[] = analyticsData.revenueData.map(
    (item: RevenueData) => ({
      timeUnit: item.timeUnit,
      revenue: item.revenue,
    })
  );
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">Analytics</div>
        <Dropdown
          color="blue"
          label={range == 1 ? "This Month" : "This Year"}
          dismissOnClick={false}
        >
          <DropdownItem
            onClick={() => {
              setRange(1);
              console.log("change range:" + range);
            }}
          >
            This Month
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setRange(2);
              console.log("change range:" + range);
            }}
          >
            This Year
          </DropdownItem>
        </Dropdown>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="text-lg font-medium text-slate-gray">Report</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-5">
          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-american-green"
              icon={faTicket}
            />
            <div className="font-semibold text-lg">Total Ticket Sold</div>
            <div className="text-2xl font-bold">
              {analyticsData?.totalTicketsSold}
            </div>
          </div>

          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-american-green"
              icon={faMoneyBill}
            />
            <div className="font-semibold text-lg">Total Revenue</div>
            <div className="text-xl font-bold">
              IDR {analyticsData?.totalRevenue}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 justify-start items-start">
        <div className="text-lg font-medium text-slate-gray">Tickets Sold</div>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={dataTicketSold}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeUnit" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ticketsSold"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 justify-start items-start">
        <div className="text-lg font-medium text-slate-gray">Tickets Sold</div>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={dataRevenue}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeUnit" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
