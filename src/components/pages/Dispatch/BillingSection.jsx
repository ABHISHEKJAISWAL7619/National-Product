"use client";

import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { fetchcustomer } from "@/redux/slice/customer-slice";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomer from "../customers/AddCustomer";
import { BsBoxSeam } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import {
  createOrUpdatedispatch,
  fetchdispatchitems,
} from "@/redux/slice/dispatch-slice";
import { errorToast, successToast } from "@/utils/toastMessage";
import InvoiceModel from "./InvoiceModel";

const BillingItemRow = ({ item, qty, price, onDelete }) => {
  const formattedPrice = Number(price).toFixed(3);
  const formattedQty = Number(qty).toFixed(3);

  return (
    <div className="grid grid-cols-4 gap-2 py-2 border border-gray-100 text-sm items-center">
      <div className="font-inter text-black font-medium text-[14px] break-words">
        {item}
      </div>

      <span className="text-black">{formattedQty}</span>

      <span className="text-black">{formattedPrice}</span>

      <button
        onClick={onDelete}
        className="text-red-500 cursor-pointer hover:text-red-700 flex justify-center items-center"
        title="Delete Item"
      >
        <FiTrash2 />
      </button>
    </div>
  );
};

const SummaryRow = ({ label, value, isTotal = false }) => (
  <div
    className={`flex justify-between ${
      isTotal ? "text-lg font-bold border-t text-black pt-3 mt-3" : "text-sm"
    }`}
  >
    <span className={isTotal ? "text-black" : "text-black"}>{label} :</span>
    <span className={isTotal ? "text-black" : "text-black"}>{value}</span>
  </div>
);

export default function BillingSection({ billingItems, setBillingItems }) {
  const dispatch = useDispatch();
  const { customerList } = useSelector((s) => s.customer);
  const { loading } = useSelector((s) => s.dispatch);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  // Validation errors
  const [customerError, setCustomerError] = useState("");
  const [invoiceError, setInvoiceError] = useState("");

  const cartEmpty = billingItems.length === 0;

  useEffect(() => {
    dispatch(fetchcustomer({ filters: { limit: 500 } }));
  }, [dispatch]);

  const handleDelete = (index) => {
    setBillingItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Subtotal, CGST, SGST, Total calculation
  const { subTotal, cgst, sgst, total } = useMemo(() => {
    const subTotalCalc = billingItems.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const cgstCalc = subTotalCalc * 0.09;
    const sgstCalc = subTotalCalc * 0.09;
    const totalCalc = subTotalCalc + cgstCalc + sgstCalc;
    return {
      subTotal: subTotalCalc,
      cgst: cgstCalc,
      sgst: sgstCalc,
      total: totalCalc,
    };
  }, [billingItems]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!selectedCustomerId) {
      setCustomerError("Customer is required");
      hasError = true;
    } else {
      setCustomerError("");
    }

    if (!invoiceNumber.trim()) {
      setInvoiceError("Invoice number is required");
      hasError = true;
    } else {
      setInvoiceError("");
    }

    if (hasError) return;

    const payload = {
      items: billingItems,
      customer: selectedCustomerId,
      invoiceNo: invoiceNumber,
    };

    try {
      const response = await dispatch(
        createOrUpdatedispatch({ dispatchData: payload })
      ).unwrap();

      // Prepare invoice data
      setInvoiceData({
        customerName: customerList.find((c) => c._id === selectedCustomerId),
        items: billingItems,
        subTotal,
        cgst,
        sgst,
        total,
        orderDate: new Date(),
        orderId: invoiceNumber,
      });

      // Open modal
      setIsInvoiceOpen(true);

      // Clear cart
      setBillingItems([]);
      setSelectedCustomerId("");
      setInvoiceNumber("");

      await dispatch(fetchdispatchitems({ filters: {} }));
    } catch (error) {
      errorToast(error || "Failed to place order");
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-100 rounded-lg  flex flex-col w-full lg:w-[600px] h-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Billing Section
      </h2>
      <Button
        className="w-full cursor-pointer my-4 bg-green-400"
        onClick={() => setOpenCustomerModal(true)}
      >
        Add New Customer
      </Button>

      <AddCustomer
        isOpen={openCustomerModal}
        onClose={() => setOpenCustomerModal(false)}
      />

      <Input
        className="mb-1"
        type="select"
        label="Customer Name"
        options={customerList}
        valueKey="_id"
        labelRender={(opt) => `${opt.firstName} ${opt.lastName}`}
        onChange={(e) => setSelectedCustomerId(e.target.value)}
        error={customerError}
      />

      <div className="space-y-4 mb-6">
        <Input
          label="Invoice Number"
          placeholder="Enter invoice number"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          error={invoiceError}
        />
      </div>

      {cartEmpty && (
        <div className="w-full flex flex-col items-center justify-center text-center py-12">
          <div className="p-4 rounded-xl bg-red-50">
            <BsBoxSeam size={28} className="text-red-400" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-gray-800">
            Cart is Empty
          </h3>
          <p className="text-sm text-gray-400">Add items to place order.</p>
        </div>
      )}

      {!cartEmpty && (
        <>
          <div className="p-1 mb-4 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2 bg-gray-100 p-3 font-bold text-gray-700 text-base border-b rounded-t-lg">
              <div>Item</div>
              <div className="text-left">Quantity</div>
              <div>Price</div>
              <div className="text-center">Action</div>
            </div>

            {billingItems.map((item, index) => (
              <BillingItemRow
                key={index}
                item={item.productName}
                qty={item.quantity}
                price={item.price}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>

          <div className="pt-4 border-t space-y-2">
            <SummaryRow label="Sub Total" value={`Rs ${subTotal.toFixed(2)}`} />
            <SummaryRow label="CGST(9%)" value={`Rs ${cgst.toFixed(2)}`} />
            <SummaryRow label="SGST(9%)" value={`Rs ${sgst.toFixed(2)}`} />
            <SummaryRow
              label="Total"
              value={`Rs ${total.toFixed(2)}`}
              isTotal
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-4 border-t gap-2">
            <Button
              className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
              onClick={() => {
                setBillingItems([]);
                setSelectedCustomerId("");
                setInvoiceNumber("");
              }}
            >
              Cancel Order
            </Button>

            <Button
              onClick={handlesubmit}
              loading={loading}
              disabled={loading}
              className="flex-1 bg-blue-600 cursor-pointer text-white py-3 rounded-md hover:bg-blue-700"
            >
              Place Order
            </Button>
          </div>
        </>
      )}
      <InvoiceModel
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        data={invoiceData}
      />
    </div>
  );
}
