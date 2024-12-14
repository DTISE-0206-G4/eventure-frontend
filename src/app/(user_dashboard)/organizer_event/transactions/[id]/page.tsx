"use client";
import CustomSpinner from "@/common/CustomSpinner";
import useEvent from "@/hooks/useEvent";
import useTransactionsOrg from "@/hooks/useTransactionsOrg";
import formatDate from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, use, useState } from "react";
import Pagination from "./components/Pagination";
import { TransactionsRequestOrg } from "@/types/transaction";
interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise<{ id: string }>
}
const TransactionPage: FC<PageProps> = ({ params: pageParams }) => {
  const unwrappedParams = use(pageParams);
  const { id } = unwrappedParams;
  if (!id) {
    notFound(); // Redirects to the 404 page
  }
  const { data: session } = useSession();
  const {
    error: errorEvent,
    isLoading: isLoadingEvent,
    event,
  } = useEvent(parseInt(id, 10));
  const {
    error: errorTransactions,
    isLoading: isLoadingTransactions,
    transactions,
    setParams,
    params,
  } = useTransactionsOrg(session?.accessToken as string, {
    start: 0,
    length: 10,
    eventId: parseInt(id, 10),
  });
  const [page, setPage] = useState(1);
  const handleDataFromChild = (childData: TransactionsRequestOrg) => {
    setParams(childData);
    // refetch();
  };
  const totalPage = Math.ceil(
    (transactions?.recordsFiltered ?? 0) / params.length
  );
  if (isLoadingEvent || isLoadingTransactions) return <CustomSpinner />;
  if (errorEvent) return <div>Error: {errorEvent?.message}</div>;
  if (errorTransactions) return <div>Error: {errorTransactions?.message}</div>;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">
          [{event?.title}] Transactions
        </div>
        <div>
          <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <Pagination
                paginationParams={params}
                totalPage={totalPage}
                page={page}
                setPage={setPage}
                sendDataToParent={handleDataFromChild}
              />
            </ul>
          </nav>
        </div>
      </div>

      <div className="mt-5 grid max-lg:grid-cols-1 lg:grid-cols-3 gap-5">
        {transactions?.data.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-col gap-1 bg-white rounded-md w-full p-5 border border-platinum"
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold">[{transaction.ticket.name}]</div>
              <Link
                href={`/invoice/${transaction.id}`}
                className="bg-american-green rounded-lg py-2 px-5 text-white"
              >
                Invoice
              </Link>
            </div>
            <div className="font-semibold">Email: {transaction.user.email}</div>
            <div>Transaction time: {formatDate(transaction.createdAt)}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionPage;
