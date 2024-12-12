"use client";
import useTransactions from "@/hooks/useTransactions";
import { Transaction, TransactionsRequest } from "@/types/transaction";
import formatDate from "@/utils/formatDate";
import {
  faClock,
  faLocationDot,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import Pagination from "./components/Pagination";
import Link from "next/link";
import ReviewModal from "./components/ReviewModal";
import CustomSpinner from "@/common/CustomSpinner";

const TicketPage: FC = () => {
  const { data: session } = useSession();
  const { error, isLoading, transactions, setParams, params } = useTransactions(
    session?.accessToken as string
  );
  const [page, setPage] = useState(1);
  const handleDataFromChild = (childData: TransactionsRequest) => {
    setParams(childData);
    // refetch();
  };
  const totalPage = Math.ceil(
    (transactions?.recordsFiltered ?? 0) / params.length
  );
  if (isLoading) return <CustomSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">My Tickets</div>

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
      <div className="mt-5 flex flex-col gap-5">
        {transactions?.data.length === 0 ? (
          <div className="col-span-3 text-center text-slate-gray">
            No ticket found
          </div>
        ) : (
          transactions?.data.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="flex gap-5 items-center bg-white rounded-md w-full p-5 border border-platinum"
            >
              <Image
                className="rounded-md w-[100px] h-[50px] object-cover"
                src="/images/carousel-1.svg"
                width={50}
                height={100}
                alt="Picture of the author"
              />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <div className="font-semibold">
                    {transaction.ticket.event.title +
                      " - [" +
                      transaction.ticket.name +
                      "]"}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={"/invoice/" + transaction.id}
                      className="bg-american-green rounded-lg py-2 px-5 text-white"
                    >
                      Invoice
                    </Link>
                    <ReviewModal
                      eventId={transaction.ticket.event.id}
                      accessToken={session?.accessToken as string}
                      eventTitle={transaction.ticket.event.title}
                    />
                    <Link
                      href={"/event/" + transaction.ticket.event.id}
                      className="bg-azureish-white rounded-lg py-2 px-5  flex gap-2 items-center"
                    >
                      <div>Event page</div>
                      <FontAwesomeIcon
                        className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                        icon={faUpRightFromSquare}
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <FontAwesomeIcon
                        className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                        icon={faLocationDot}
                      />
                      <div className="text-sm text-slate-gray">
                        {transaction.ticket.event.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <FontAwesomeIcon
                        className="w-[15px] h-[15px] shrink-0 text-slate-gray"
                        icon={faClock}
                      />
                      <div className="text-sm text-slate-gray">
                        <div className="text-sm text-slate-gray">
                          {formatDate(transaction.ticket.event.startTime)} -{" "}
                          {formatDate(transaction.ticket.event.endTime)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap flex-row-reverse">
                    {transaction.ticket.event.categories.map((category) => (
                      <div
                        key={category.id}
                        className="text-slate-gray rounded-full px-2 border border-slate-gray"
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TicketPage;
