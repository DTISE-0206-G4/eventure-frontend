"use client";
import useInvoice from "@/hooks/useInvoice";
import formatDate, { formatDateForInvoice } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { FC, use } from "react";

interface PageProps {
  params: Promise<{ id: string }>; // params is a Promise<{ id: string }>
}
const InvoicePage: FC<PageProps> = ({ params }) => {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  if (!id) {
    notFound(); // Redirects to the 404 page
  }
  const { data: session } = useSession();
  const {
    isLoading,
    error,
    transaction: invoice,
    refetch,
  } = useInvoice(session?.accessToken as string, parseInt(id, 10));
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    notFound();
  }

  return (
    <div className="container mx-auto h-[calc(100vh-150px)]">
      <div className="flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-300 w-1/2">
          <div className="text-center border border-platinum rounded-lg hover:cursor-pointer mb-4">
            <div className="text-sm">Download Invoice</div>
          </div>
          <div>
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
                <p className="text-sm text-gray-500">
                  #
                  {formatDateForInvoice(invoice?.createdAt as string) +
                    "/" +
                    invoice?.id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Transaction Time:</strong>{" "}
                  {formatDate(invoice?.createdAt as string)}
                </p>
              </div>
            </div>

            {/* Company and Client Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-700">From</h2>
                <p className="text-gray-800">
                  {invoice?.ticket.event.user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {invoice?.ticket.event.user.email}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-700">To</h2>
                <p className="text-gray-800">{invoice?.user.name}</p>
                <p className="text-sm text-gray-500">{invoice?.user.email}</p>
              </div>
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <div className="flex font-semibold text-gray-700 border-b border-gray-200 pb-2">
                <div className="w-4/5">Description</div>
                <div className="w-1/5 text-right">Price</div>
              </div>
              <div className="flex items-center text-gray-700 border-b border-gray-100 py-3">
                <div className="w-4/5">[{invoice?.ticket.name}]</div>
                <div className="w-1/5 text-right">
                  IDR {invoice?.ticket.price}
                </div>
              </div>
              <div className="flex font-semibold text-gray-700 border-b border-gray-200 pb-2">
                <div className="w-full">Discount</div>
              </div>
              {invoice?.eventDiscounts.map((discount) => (
                <div
                  key={discount.id}
                  className="flex items-center text-gray-700 border-b border-gray-100 py-3"
                >
                  <div className="w-3/5">{discount.title}</div>
                  <div className="w-1/5">
                    {discount.amount}
                    {discount.isPercentage ? " %" : " Points"}
                  </div>
                  <div className="w-1/5 text-right">
                    IDR -
                    {discount.isPercentage
                      ? (discount.amount * (invoice?.ticket.price ?? 0)) / 100
                      : discount.amount}
                  </div>
                </div>
              ))}

              {invoice?.userDiscounts.map((discount) => (
                <div
                  key={discount.id}
                  className="flex items-center text-gray-700 border-b border-gray-100 py-3"
                >
                  <div className="w-3/5">{discount.name}</div>
                  <div className="w-1/5">
                    {discount.amount}
                    {discount.isPercentage ? " %" : " Points"}
                  </div>
                  <div className="w-1/5 text-right">
                    IDR -
                    {discount.isPercentage
                      ? (discount.amount * (invoice?.ticketPrice ?? 0)) / 100
                      : discount.amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="flex justify-end">
              <div className="w-1/3">
                <div className="flex justify-between border-t border-gray-200 pt-4 font-semibold text-gray-800">
                  <span>Total:</span>
                  <span>IDR {invoice?.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
