"use client";
import { FC, useEffect, useState } from "react";
import DiscountList from "./components/DiscountList";
import TicketList from "./components/TicketList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface ProfileProps {
  name: string;
  email: string;
  description: string;
  referralCode: string;
}

interface JwtPayload {
  [key: string]: any;
}

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const router = useRouter();
  const [scope, setScope] = useState<string>("ATTENDEE");

  const [activeTab, setActiveTab] = useState(
    scope === "ATTENDEE" ? "tickets" : "events"
  );
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.data);
      })
      .catch((error) => {
        if (error.status === 401) {
          console.log(error.message);
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const getScope = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token as string) as JwtPayload;
    return decodedToken?.scope;
  };

  useEffect(() => {
    const scope = getScope();
    if (scope === "ORGANIZER") {
      setActiveTab("events");
    }
    setScope(scope);
    fetchProfile();
  }, []);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (!profile) return null;
  return (
    <div>
      <div className="py-5 text-3xl">PROFILE</div>
      <div className="flex gap-20 items-center py-5">
        <div className="bg-slate-500 w-[200px] h-[200px]">Image</div>
        <div>
          <div>Name: {profile.name}</div>
          <div>Email: {profile.email}</div>
          <div>Referral Code: {profile.referralCode}</div>
          <div>Description: {profile.description}</div>
        </div>
      </div>
      {scope === "ATTENDEE" && (
        <div className="flex gap-5 justify-center">
          <div className="flex flex-col gap-5 items-start">
            <button onClick={() => handleTabClick("tickets")}>Tickets</button>
            <hr className="bg-slate-500 w-full" />
            <button onClick={() => handleTabClick("discounts")}>
              Discounts
            </button>
            <hr className="bg-slate-500 w-full" />
          </div>
          <div className="w-px bg-gray-400"></div>
          <div className="flex flex-col gap-5 w-full">
            {activeTab === "tickets" && <TicketList />}
            {activeTab === "discounts" && <DiscountList />}
          </div>
        </div>
      )}
      {scope === "ORGANIZER" && (
        <div className="flex gap-5 justify-center">
          <div className="flex flex-col gap-5 items-start">
            <button onClick={() => handleTabClick("events")}>Events</button>
            <hr className="bg-slate-500 w-full" />
            <button onClick={() => handleTabClick("discounts")}>
              Discounts
            </button>
            <hr className="bg-slate-500 w-full" />
            <button onClick={() => handleTabClick("analytics")}>
              Analytics
            </button>
            <hr className="bg-slate-500 w-full" />
          </div>
          <div className="w-px bg-gray-400"></div>
          <div className="flex flex-col gap-5 w-full">
            {activeTab === "events" && <div>Events list</div>}
            {activeTab === "discounts" && <div>Discount list</div>}
            {activeTab === "analytics" && <div>Analytics Dashboard</div>}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
