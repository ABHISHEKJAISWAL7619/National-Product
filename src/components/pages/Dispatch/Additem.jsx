"use client";

import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import OverlayModal from "@/components/common/OverlayModal";
import { useState, useEffect } from "react";
import { FiPackage } from "react-icons/fi";

export default function Additem({ open, onClose, product, onAdd }) {
  console.log(product);
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [qtyError, setQtyError] = useState("");
  const [priceError, setPriceError] = useState("");

  // Clear inputs on open or product change
  useEffect(() => {
    if (open && product) {
      setQty("");
      setPrice("");
      setQtyError("");
      setPriceError("");
    }
  }, [open, product]);

  if (!product) return null;

  const handleAdd = () => {
    let hasError = false;
    if (!qty) {
      setQtyError("Quantity is required");
      hasError = true;
    } else setQtyError("");

    if (!price) {
      setPriceError("Price is required");
      hasError = true;
    } else setPriceError("");

    if (hasError) return;

    const payload = {
      quantity: Number(qty),
      price: Number(price),
      productName: product.productName,
      type: product.type, // keep the type in payload
    };

    if (product.type === "level1") {
      payload.production1 = product._id;
    } else if (product.type === "level2") {
      payload.production2 = product._id;
    } else {
      payload.item = product._id; // fallback if type is unknown
    }

    onAdd(payload);

    setQty("");
    setPrice("");
    onClose();
  };

  return (
    <OverlayModal
      isOpen={open}
      onClose={onClose}
      modalClass="bg-white rounded-2xl shadow-xl p-6"
      backdropClass="bg-black/30 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <FiPackage className="text-blue-600" size={22} /> Add Item
        </h2>
      </div>

      <div className="mb-5 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-800">
          <span className="font-semibold text-gray-900">Product:</span>
          <span>{product.productName}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-800 mt-2">
          <span className="font-semibold text-gray-900">Available Qty:</span>
          <span>{product.quantity}</span>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Quantity"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          error={qtyError}
        />
        <Input
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={priceError}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          onClick={handleAdd}
          className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add Item
        </Button>
      </div>
    </OverlayModal>
  );
}
