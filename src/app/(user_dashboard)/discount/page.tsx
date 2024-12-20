"use client";
import CustomSpinner from "@/common/CustomSpinner";
import useUserDiscounts from "@/hooks/useUserDiscounts";
import { UserDiscountResponse } from "@/types/userDiscountType";
import formatDate from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { FC } from "react";

const DiscountPage: FC = () => {
  const { data: session } = useSession();
  const { error, isLoading, discounts } = useUserDiscounts(
    session?.accessToken as string
  );
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="font-semibold text-xl">My Discount Vouchers</div>
      <div className="mt-5 lg:grid lg:grid-cols-3 max-lg:flex max-lg:flex-col gap-5">
        {discounts?.length === 0 && (
          <div className="col-span-3 text-center text-slate-gray">
            No discount voucher found
          </div>
        )}
        {discounts?.map((discount: UserDiscountResponse) => (
          <div
            key={discount.id}
            className="flex flex-col gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum"
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between">
                <div className="font-semibold">{discount.name}</div>
                <div className="text-american-green font-semibold">
                  {discount.amount}
                  {discount.isPercentage ? " %" : " Points"}
                </div>
              </div>
              <div className="text-sm text-slate-gray">
                {discount.description}
              </div>
              <div className="text-sm text-slate-gray">
                Code :{" "}
                <span className="text-american-green font-semibold">
                  {discount.code}
                </span>
              </div>
              <div className="text-sm text-slate-gray">
                Expired : {formatDate(discount.expiredAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DiscountPage;
