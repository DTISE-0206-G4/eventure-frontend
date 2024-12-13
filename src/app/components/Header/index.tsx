"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";

const Header: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();
  const handleLogout = async () => {
    if (!session) {
      alert("You are not logged in.");
      return;
    }
    // Call your custom logout API
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(error.response?.data.message, "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      await signOut({ redirect: false });
      router.push("/login");
    }
  };
  return (
    <div className="h-[60px] bg-white  border-b-2 border-platinum">
      <div className="container h-full flex justify-between items-center lg:mx-auto">
        <div className="max-lg:ms-2">
          <Link href="/">
            <Image
              src="/images/eventure-full.png"
              width={150}
              height={50}
              alt="logo"
            />
          </Link>
        </div>

        {session && (
          <>
            <Dropdown
              label={
                <div className="flex gap-2 items-start justify-start text-start flex-wrap max-lg:me-2">
                  <Image
                    className="rounded-md"
                    src="/images/default-profile.jpg"
                    width={45}
                    height={45}
                    alt="User Profile"
                  />
                  <div className="flex flex-col justify-center max-sm:hidden">
                    <div>{session.user.email}</div>
                    <div className="text-slate-gray text-xs">
                      {session.user.roles[0]}
                    </div>
                  </div>
                </div>
              }
              inline
              arrowIcon={false}
            >
              <DropdownItem>
                <Link href="/profile">Profile Settings</Link>
              </DropdownItem>
              {session.user.roles[0] === "ORGANIZER" && (
                <>
                  <DropdownItem>
                    <Link href="/organizer_event">My Events</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/analytics">Analytics</Link>
                  </DropdownItem>
                </>
              )}
              {session.user.roles[0] === "ATTENDEE" && (
                <>
                  <DropdownItem>
                    <Link href="/ticket">Tickets</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link href="/discount">Discount</Link>
                  </DropdownItem>
                </>
              )}

              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </>
        )}
        {!session && (
          <div className="flex gap-5 max-lg:me-2">
            <div className="text-tufts-blue hover:cursor-pointer">
              <Link href="/login">Login</Link>
            </div>
            <div className="text-tufts-blue  hover:cursor-pointer">
              <Link href="/register">Register</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
