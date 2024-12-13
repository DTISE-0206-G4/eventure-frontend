"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NestedLayoutProps {
  children: React.ReactNode;
}
const ProfileLayout: FC<NestedLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div className="container mx-auto min-h-[calc(100vh-150px)]">
      <div className="my-5">
        <div className="font-semibold text-xl">User Dashboard</div>
        <div className="flex gap-5 max-lg:flex-col lg:justify-between mt-5 bg-white border border-platinum rounded-sm p-5">
          <div className="lg:w-1/5 lg:border-r max-lg:border-b border-platinum flex lg:flex-col">
            <Link
              href="/profile"
              className={`${
                pathname === "/profile" ? "bg-azureish-white" : ""
              }  p-5 font-semibold hover:bg-azureish-white hover:cursor-pointer`}
            >
              Profile Settings
            </Link>
            {session?.user?.roles[0] === "ORGANIZER" && (
              <>
                <Link
                  href="/organizer_event"
                  className={`${
                    pathname === "/organizer_event" ? "bg-azureish-white" : ""
                  }  p-5 font-semibold hover:bg-azureish-white hover:cursor-pointer`}
                >
                  My Events
                </Link>
                <Link
                  href="/analytics"
                  className={`${
                    pathname === "/analytics" ? "bg-azureish-white" : ""
                  }  p-5 font-semibold hover:bg-azureish-white hover:cursor-pointer`}
                >
                  Analytics
                </Link>
              </>
            )}
            {session?.user?.roles[0] === "ATTENDEE" && (
              <>
                <Link
                  href="/ticket"
                  className={`${
                    pathname === "/ticket" ? "bg-azureish-white" : ""
                  }  p-5 font-semibold hover:bg-azureish-white hover:cursor-pointer`}
                >
                  My Tickets
                </Link>
                <Link
                  href="/discount"
                  className={`${
                    pathname === "/discount" ? "bg-azureish-white" : ""
                  }  p-5 font-semibold hover:bg-azureish-white hover:cursor-pointer`}
                >
                  My Discount Vouchers
                </Link>
              </>
            )}
          </div>
          <div className="lg:w-4/5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
