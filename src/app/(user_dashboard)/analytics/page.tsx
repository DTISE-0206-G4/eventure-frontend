"use client";
import {
  faCalendar,
  faComment,
  faMoneyBill,
  faPeopleGroup,
  faPerson,
  faStar,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownItem } from "flowbite-react";
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
  date: string;
  ticketsSold: number;
}
interface DataPointRevenue {
  date: string;
  revenue: number;
}

const dataTicketSold: DataPointTicketSold[] = [
  { date: "2023-12-01", ticketsSold: 40 },
  { date: "2023-12-02", ticketsSold: 30 },
  { date: "2023-12-03", ticketsSold: 20 },
  { date: "2023-12-04", ticketsSold: 27 },
  { date: "2023-12-05", ticketsSold: 18 },
  { date: "2023-12-06", ticketsSold: 23 },
];
const dataRevenue: DataPointRevenue[] = [
  { date: "2023-12-01", revenue: 200 },
  { date: "2023-12-02", revenue: 150 },
  { date: "2023-12-03", revenue: 100 },
  { date: "2023-12-04", revenue: 135 },
  { date: "2023-12-05", revenue: 90 },
  { date: "2023-12-06", revenue: 115 },
];

const AnalyticsPage: FC = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">Analytics</div>
        <Dropdown color="blue" label="Last 7 days" dismissOnClick={false}>
          <DropdownItem>Last 7 days</DropdownItem>
          <DropdownItem>Last 30 days</DropdownItem>
          <DropdownItem>Last 360 days</DropdownItem>
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
            <div className="text-2xl font-bold">50</div>
          </div>

          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-american-green"
              icon={faMoneyBill}
            />
            <div className="font-semibold text-lg">Total Revenue</div>
            <div className="text-xl font-bold">Rp. 25,000,000</div>
          </div>

          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-tufts-blue"
              icon={faCalendar}
            />
            <div className="font-semibold text-lg">Total Events Held</div>
            <div className="text-2xl font-bold">15</div>
          </div>

          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-true-blue"
              icon={faPeopleGroup}
            />
            <div className="font-semibold text-lg">Total Attendees</div>
            <div className="text-2xl font-bold">500</div>
          </div>

          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-slate-gray"
              icon={faComment}
            />
            <div className="font-semibold text-lg">Total Reviews</div>
            <div className="text-2xl font-bold">75</div>
          </div>

          <div className="border border-platinum rounded-lg p-5 text-center flex flex-col gap-2 items-center">
            <FontAwesomeIcon
              className="h-5 w-5 text-yellow-300"
              icon={faStar}
            />
            <div className="font-semibold text-lg">Average Ratings</div>
            <div className="text-2xl font-bold">4.5</div>
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
              <XAxis dataKey="date" />
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
              <XAxis dataKey="date" />
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
