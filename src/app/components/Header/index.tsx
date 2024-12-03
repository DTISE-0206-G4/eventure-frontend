"use client";
import axios from "axios";
import { access } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
import defaultProfileImage from "../../public/image/default-profile.jpg";
const checkToken: () => boolean = () => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    console.log("Token exists:", token);
    return true;
  } else {
    console.log("Token does not exist");
    return false;
  }
};

const Header: FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const logoutRequest = async () => {
    const token = localStorage.getItem("token");
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          accessToken: token,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.removeItem("token");
          setIsLogin(false);
          router.push("/");
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          console.log(error.message);
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };
  useEffect(() => {
    setIsLogin(checkToken());
  }, []);
  //   const isLogin: boolean = checkToken();
  return (
    <div className="h-[60px] bg-white  border-b-2 border-platinum">
      <div className="container h-full flex justify-between items-center mx-auto">
        <div>
          <Link href="/">
            {/* <div>Eventure</div> */}
            <Image
              src="/images/eventure-full.png"
              width={150}
              height={50}
              alt="logo"
            />
          </Link>
        </div>

        <Dropdown
          label={
            <div className="flex gap-2 items-center justify-start">
              <Image
                className="rounded-md"
                src="/images/default-profile.jpg"
                width={45}
                height={45}
                alt="User Profile"
              />
              <div className="flex flex-col justify-center">
                <div>Gora Asep</div>
                <div className="text-slate-gray text-xs">ATTENDEE</div>
              </div>
            </div>
          }
          inline
          arrowIcon={false}
        >
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Events</DropdownItem>
          <DropdownItem>Tickets</DropdownItem>
          <DropdownItem>Feedback</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};
export default Header;
