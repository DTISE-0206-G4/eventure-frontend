"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface DiscountProps {
  title: string;
  description: string;
  code: string;
  amount: number;
  percentage: boolean;
  expiredAt: string;
}

const DiscountList: FC = () => {
  const router = useRouter();
  const [discounts, setDiscounts] = useState<DiscountProps[]>([]);
  const fetchDiscounts = async () => {
    // router.push("/login");
    const token = localStorage.getItem("token");
    // try {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/discount`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setDiscounts(response.data.data);
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
    fetchDiscounts();
  }, []);
  return (
    <>
      {/* {JSON.stringify(discounts)} */}
      {discounts.map((discount: DiscountProps, index) => (
        <div className="bg-slate-500 p-5 rounded-lg w-full" key={index}>
          <div>{discount.title}</div>
          <div>{discount.description}</div>
          <div>Code: {discount.code}</div>
          <div>
            Discount/Point: {discount.amount}{" "}
            {discount.percentage ? "%" : "Point"}
          </div>
          <div>Expired At: {discount.expiredAt}</div>
        </div>
      ))}
    </>
  );
};

export default DiscountList;
