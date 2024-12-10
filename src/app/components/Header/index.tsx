"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleLogout = async () => {
    if (!session) {
      alert("You are not logged in.");
      return;
    }
    // Call your custom logout API
    const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      }),
    });

    if (response.ok) {
      // Sign out from NextAuth (clears the session)
      await signOut({ redirect: false });
      router.push("/login");
    } else {
      alert("Failed to log out, please try again.");
    }
  };
  return (
    <div className="h-[60px] bg-white  border-b-2 border-platinum">
      <div className="container h-full flex justify-between items-center mx-auto">
        <div>
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
                <div className="flex gap-2 items-start justify-start text-start">
                  <Image
                    className="rounded-md"
                    src="/images/default-profile.jpg"
                    width={45}
                    height={45}
                    alt="User Profile"
                  />
                  <div className="flex flex-col justify-center">
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
              <DropdownItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownItem>
              {session.user.roles[0] === "ORGANIZER" && (
                <>
                  <DropdownItem onClick={() => router.push("/organizer_event")}>
                    Events
                  </DropdownItem>
                  <DropdownItem onClick={() => router.push("/analytics")}>
                    Analytics
                  </DropdownItem>
                </>
              )}
              {session.user.roles[0] === "ATTENDEE" && (
                <>
                  <DropdownItem onClick={() => router.push("/ticket")}>
                    Tickets
                  </DropdownItem>
                  <DropdownItem onClick={() => router.push("/discount")}>
                    Discounts
                  </DropdownItem>
                </>
              )}

              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          </>
        )}
        {!session && (
          <div className="flex gap-5">
            <div
              className="text-tufts-blue hover:cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </div>
            <div
              className="text-tufts-blue  hover:cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
