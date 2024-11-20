"use client";
import { FC, useState } from "react";
import DiscountList from "./components/DiscountList";
import TicketList from "./components/TicketList";

const ProfilePage: FC = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <div className="py-5 text-3xl">PROFILE</div>
      <div className="flex gap-20 items-center py-5">
        <div className="bg-slate-500 w-[200px] h-[200px]">Image</div>
        <div>
          <div>Name</div>
          <div>Description</div>
        </div>
      </div>

      <div className="flex gap-5 justify-center">
        <div className="flex flex-col gap-5 items-start">
          <button onClick={() => handleTabClick("tickets")}>Tickets</button>
          <hr className="bg-slate-500 w-full" />
          <button onClick={() => handleTabClick("discounts")}>Discounts</button>
          <hr className="bg-slate-500 w-full" />
        </div>
        <div className="w-px bg-gray-400"></div>
        <div className="flex flex-col gap-5 w-full">
          {activeTab === "tickets" && <TicketList />}
          {activeTab === "discounts" && <DiscountList />}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
