"use client";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import OverlayModal from "@/components/common/OverlayModal";

const InvoiceModal = ({ isOpen, onClose, data }) => {
  const {
    customerName,
    items,
    subTotal,
    cgst,
    sgst,
    total,
    orderDate,
    orderId,
  } = data || {};
  console.log(data)

  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${orderId}-${customerName?.firstname}`,
    bodyClass: "print-body",
  });

  return (
    <OverlayModal modalClass="!max-w-xl px-4" isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg text-gray-900 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-semibold">Invoice</h2>

        {/* Content Box */}
        <div ref={contentRef} className="w-full">
          <div className="border border-gray-100 rounded-lg p-6 shadow-sm">
            {/* Header */}
            <h3 className="font-bold text-center text-lg">National Product</h3>
            <p className="text-center text-sm text-gray-600">
              Phone : +00xxxxxxxxxx
            </p>

            {/* Order Details */}
            <p className="text-sm mt-4">
              Order ID : <b className="text-black">{orderId}</b> |{" "}
              {moment(orderDate).format("DD/MMM/YYYY hh:mm a")}
            </p>

            <p className="text-sm mt-1">
              Customer Name :{" "}
              <b className="text-black">
                {customerName?.firstname} {customerName?.lastname}
              </b>
            </p>

            {/* Table */}
            <table className="w-full border mt-4 text-sm">
              <thead>
                <tr className="border bg-gray-100">
                  <th className="border px-3 py-2 text-left w-[70px]">QTY</th>
                  <th className="border px-3 py-2 text-left">DESC</th>
                  <th className="border px-3 py-2 text-left w-[120px]">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.map(({ itemName, quantity, price, _id }) => (
                  <tr key={_id}>
                    <td className="border px-3 py-2">{quantity}</td>
                    <td className="border px-3 py-2">
                      {itemName?.productName || "-"}
                    </td>
                    <td className="border px-3 py-2">Rs {price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="mt-4 text-sm text-right space-y-1">
              <p>Item Price : {subTotal?.toFixed(2)}</p>
              <p>CGST : {cgst?.toFixed(2)}</p>
              <p>SGST : {sgst?.toFixed(2)}</p>
              <p className="font-bold text-base">
                Total : Rs {total?.toFixed(2)}
              </p>
            </div>

            <p className="text-sm mt-3">Paid by: Offline</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer font-medium"
          >
            Proceed, If thermal print is ready
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </OverlayModal>
  );
};

export default InvoiceModal;
