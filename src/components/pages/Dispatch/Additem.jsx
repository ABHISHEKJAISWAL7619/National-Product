// "use client";

// import { Button } from "@/components/common/Button";
// import Input from "@/components/common/Input";
// import OverlayModal from "@/components/common/OverlayModal";
// import { useState, useEffect } from "react";
// import { FiPackage } from "react-icons/fi";

// export default function Additem({ open, onClose, product, onAdd }) {
//   console.log(product);
//   const [qty, setQty] = useState("");
//   const [price, setPrice] = useState("");
//   const [qtyError, setQtyError] = useState("");
//   const [priceError, setPriceError] = useState("");

//   useEffect(() => {
//     if (open && product) {
//       setQty("");
//       setPrice("");
//       setQtyError("");
//       setPriceError("");
//     }
//   }, [open, product]);

//   if (!product) return null;

//   const handleAdd = () => {
//     let hasError = false;
//     if (!qty) {
//       setQtyError("Quantity is required");
//       hasError = true;
//     } else setQtyError("");

//     if (!price) {
//       setPriceError("Price is required");
//       hasError = true;
//     } else setPriceError("");

//     if (hasError) return;

//     const payload = {
//       quantity: Number(qty),
//       price: Number(price),
//       productName: product.productName,
//       type: product.type, // keep the type in payload
//     };

//     if (product.type === "level1") {
//       payload.production1 = product._id;
//     } else if (product.type === "level2") {
//       payload.production2 = product._id;
//     } else {
//       payload.item = product._id; // fallback if type is unknown
//     }

//     onAdd(payload);

//     setQty("");
//     setPrice("");
//     onClose();
//   };

//   return (
//     <OverlayModal
//       isOpen={open}
//       onClose={onClose}
//       modalClass="bg-white rounded-2xl shadow-xl p-6"
//       backdropClass="bg-black/30 backdrop-blur-md"
//     >
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//           <FiPackage className="text-blue-600" size={22} /> Add Item
//         </h2>
//       </div>

//       <div className="mb-5 p-4 rounded-xl bg-gray-50 border border-gray-200">
//         <div className="flex items-center justify-between text-sm text-gray-800">
//           <span className="font-semibold text-gray-900">Product:</span>
//           <span>{product.productName}</span>
//         </div>
//         <div className="flex items-center justify-between text-sm text-gray-800 mt-2">
//           <span className="font-semibold text-gray-900">Available Qty:</span>
//           <span>{product.quantity}</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <Input
//           label="Quantity"
//           type="number"
//           value={qty}
//           onChange={(e) => setQty(e.target.value)}
//           error={qtyError}
//         />
//         <Input
//           label="Price"
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           error={priceError}
//         />
//       </div>

//       <div className="flex justify-end gap-3 mt-6">
//         <Button
//           onClick={handleAdd}
//           className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-900 transition"
//         >
//           Add Item
//         </Button>
//       </div>
//     </OverlayModal>
//   );
// }
"use client";

import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import OverlayModal from "@/components/common/OverlayModal";
import { useState, useEffect } from "react";
import { FiPackage } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchprices } from "@/redux/slice/price-slice";
import { successToast, errorToast } from "@/utils/toastMessage";

export default function Additem({ open, onClose, product, onAdd }) {
  const dispatch = useDispatch();
  console.log(product);

  const [qty, setQty] = useState("");
  const [price, setPrice] = useState(0);
  const [qtyError, setQtyError] = useState("");
  const [priceError, setPriceError] = useState("");

  const [addFO, setAddFO] = useState(false); // Factory overhead checkbox
  const [foPercentage, setFoPercentage] = useState(0); // FO percentage

  // Fetch price per kg when modal opens
  useEffect(() => {
    if (open && product) {
      setQty("");
      setPrice(0);
      setQtyError("");
      setPriceError("");
      setAddFO(false);
      setFoPercentage(0);
      fetchPricePerKg();
    }
  }, [open, product]);

  const fetchPricePerKg = async () => {
    try {
      const payload = {
        itemId: product._id,
        targetKg: 1, // always 1 initially
      };
      const res = await dispatch(fetchprices({ formData: payload })).unwrap();
      setPrice(res.data.totalRawMaterialCost);
    } catch (err) {
      errorToast("Failed to fetch price per kg");
    }
  };

  const calculateTotalPrice = (quantity, foPercent = 0) => {
    let total = Number(quantity) * Number(price);
    if (foPercent > 0) {
      total += (total * foPercent) / 100;
    }
    return total;
  };

  const handleQtyChange = (value) => {
    setQty(value);
    setPriceError("");
  };

  const handleFoChange = (value) => {
    setFoPercentage(value);
  };

  const handleAdd = () => {
    let hasError = false;

    if (!qty || qty <= 0) {
      setQtyError("Quantity is required");
      hasError = true;
    } else setQtyError("");

    if (!price || price <= 0) {
      setPriceError("Price is required");
      hasError = true;
    } else setPriceError("");

    if (hasError) return;

    const totalPrice = calculateTotalPrice(qty, addFO ? foPercentage : 0);

    const payload = {
      quantity: Number(qty),
      price: Number(totalPrice),
      productName: product.productName,
      type: product.type,
      factoryOverhead: addFO ? Number(foPercentage) : 0, // send FO % if added
    };

    if (product.type === "level1") {
      payload.production1 = product._id;
    } else if (product.type === "level2") {
      payload.production2 = product._id;
    } else {
      payload.item = product._id;
    }

    onAdd(payload);

    setQty("");
    setPrice(0);
    setAddFO(false);
    setFoPercentage(0);
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
          <span>{product?.productName ?? ""}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-800 mt-2">
          <span className="font-semibold text-gray-900">Available Qty:</span>
          <span>{product?.quantity ?? ""}</span>{" "}
        </div>{" "}
      </div>
      <div className="space-y-4">
        <Input
          label="Quantity"
          type="number"
          value={qty}
          onChange={(e) => handleQtyChange(e.target.value)}
          error={qtyError}
        />

        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={addFO}
            onChange={(e) => setAddFO(e.target.checked)}
            id="factoryOverhead"
            className="w-4 h-4"
          />
          <label htmlFor="factoryOverhead" className="text-gray-800 text-sm">
            Add Factory Overhead
          </label>
        </div> */}

        {addFO && (
          <Input
            label="Factory Overhead %"
            type="number"
            value={foPercentage}
            onChange={(e) => handleFoChange(e.target.value)}
            placeholder="Enter percentage"
          />
        )}

        <Input
          label="Total Price"
          type="number"
          value={calculateTotalPrice(qty, addFO ? foPercentage : 0)}
          readOnly
          error={priceError}
        />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <Button
          onClick={handleAdd}
          className="px-4 py-2 text-sm cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-900 transition"
        >
          Add Item
        </Button>
      </div>
    </OverlayModal>
  );
}
