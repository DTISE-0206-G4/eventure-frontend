"use client";
import useInvoice from "@/hooks/useInvoice";
import formatDate, { formatDateForInvoice } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { FC, use, useRef } from "react";
import html2canvas from "html2canvas";
import CustomSpinner from "@/common/CustomSpinner";
import { formatCurrency } from "@/utils/formatCurrency";
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
  } = useInvoice(session?.accessToken as string, parseInt(id, 10));
  const divRef = useRef<HTMLDivElement>(null);
  if (isLoading) return <CustomSpinner />;
  if (error) {
    notFound();
  }

  const downloadImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current).then((canvas) => {
        // Create a link to download the image
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png"); // or 'image/jpeg'
        link.download = "Invoice.png"; // Set the name of the downloaded file
        link.click();
      });
    }
  };
  return (
    <div className="container mx-auto min-h-[calc(100vh-150px)] px-4 sm:px-6 lg:px-8">
      <div className="mt-5 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 border border-gray-300 w-full sm:w-3/4 lg:w-1/2">
        <div className="text-center border border-platinum rounded-lg hover:cursor-pointer mb-4">
          <div onClick={downloadImage} className="text-sm">
            Download Invoice
          </div>
        </div>
        <div ref={divRef} className="p-4 sm:p-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
              <p className="text-sm text-gray-500">
                #INV
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-700">From</h2>
              <p className="text-gray-800">{invoice?.ticket.event.user.name}</p>
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
              <div className="w-4/5">
                {invoice?.ticket.event.title} - [{invoice?.ticket.name}]
              </div>
              <div className="w-1/5 text-right">
                IDR {formatCurrency(invoice?.ticket.price as number)}
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
                  {formatCurrency(
                    discount.isPercentage
                      ? (discount.amount * (invoice?.ticket.price ?? 0)) / 100
                      : discount.amount
                  )}
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
                  {formatCurrency(
                    discount.isPercentage
                      ? (discount.amount * (invoice?.ticketPrice ?? 0)) / 100
                      : discount.amount
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="flex justify-end">
            <div className="w-full sm:w-1/3">
              <div className="flex justify-between border-t border-gray-200 pt-4 font-semibold text-gray-800">
                <span>Total:</span>
                <span>IDR {formatCurrency(invoice?.totalPrice as number)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
