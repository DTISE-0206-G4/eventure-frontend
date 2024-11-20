"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

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
  useEffect(() => {
    setIsLogin(checkToken());
  }, []);
  //   const isLogin: boolean = checkToken();
  return (
    <div className="h-[96px] bg-slate-500 flex justify-between items-center px-5">
      <div>
        <Link href="/">
          <div>Eventure</div>
        </Link>
      </div>
      <div className="flex gap-5">
        {isLogin ? (
          <>
            <Link href="/profile">
              <div>Profile</div>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
                setIsLogin(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <div>Login</div>
            </Link>
            <Link href="/register">
              <div>Register</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
