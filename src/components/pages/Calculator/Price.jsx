"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";

import { useForm } from "@/hooks/useForm";
import { priceSchema } from "@/validations/price";

import { getallitems } from "@/redux/slice/Item-slice";
import { errorToast, successToast } from "@/utils/toastMessage";
import { fetchprices } from "@/redux/slice/price-slice";

const BreakdownDisplay = ({ data }) => {
  if (!data) return null;

  const {
    productName,
    targetKg,
    factoryOverhead,
    rawMaterials,
    totalRawMaterialCost,
    finalCost,
  } = data;

  const materialArray = Object.values(rawMaterials || {});

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-medium text-gray-700">Product Name</p>
          <p className="font-bold text-blue-900">{productName}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-medium text-gray-700">Target KG</p>
          <p className="font-bold text-blue-900">{targetKg}</p>
        </div>

        {/* <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-medium text-gray-700">Factory Overhead</p>
          <p className="font-bold text-blue-900">{factoryOverhead}%</p>
        </div> */}

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-medium text-gray-700">Total Raw Material Cost</p>
          <p className="font-bold text-green-700">
            ₹{totalRawMaterialCost.toLocaleString()}
          </p>
        </div>
      </div>

      {/* FINAL COST */}
      {/* <div className="text-right mb-8">
        <p className="text-xl font-bold text-green-700">
          Final Cost: ₹{finalCost.toLocaleString()}
        </p>
      </div> */}

      <h3 className="text-xl font-semibold mb-4">Raw Materials</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-3 py-2 text-left">Item Name</th>
            <th className="px-3 py-2 text-left">Required Qty</th>
            <th className="px-3 py-2 text-left">Unit Price</th>
            <th className="px-3 py-2 text-left">Cost</th>
          </tr>
        </thead>

        <tbody>
          {materialArray.map((item, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              <td className="px-3 py-2">{item.productName}</td>
              <td className="px-3 py-2">{item.qty}</td>
              <td className="px-3 py-2">₹{item.unitPrice}</td>
              <td className="px-3 py-2 text-green-700">₹{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PriceCalculator = () => {
  const dispatch = useDispatch();
  const { itemList } = useSelector((state) => state.item);

  const { formData, handleChange, reset, errors } = useForm({
    defaultValues: {
      itemId: "",
      targetKg: "",
    },
    schema: priceSchema,
  });

  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    dispatch(getallitems({ filters: {} }));
  }, [dispatch]);

  const onSubmit = async () => {
    try {
      const payload = {
        itemId: formData.itemId,
        targetKg: Number(formData.targetKg),
      };

      const res = await dispatch(fetchprices({ formData: payload })).unwrap();

      successToast("Price Calculated Successfully!");

      setApiData(res.data);
    } catch (error) {
      errorToast(error || "Failed to calculate price");
    }
  };

  const isSubmitDisabled = () => {
    return !formData.itemId || !formData.targetKg || formData.targetKg <= 0;
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="font-bold text-2xl text-center mb-6">
          Price Calculator
        </h2>

        <div className="space-y-4">
          <Input
            label="Item"
            type="select"
            value={formData.itemId}
            placeholderOption="Select Item"
            options={
              itemList?.map((i) => ({
                label: i.name || i.productName,
                value: i._id,
              })) || []
            }
            onChange={(e) => handleChange("itemId", e.target.value)}
            error={errors.itemId}
          />

          <Input
            label="Target Kg"
            type="number"
            placeholder="0"
            value={formData.targetKg}
            onChange={(e) => handleChange("targetKg", Number(e.target.value))}
            error={errors.targetKg}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            className="bg-gray-600 text-black cursor-pointer"
            onClick={() => {
              reset();
              setApiData(null);
            }}
          >
            Reset
          </Button>

          <Button
            className={`text-white cursor-pointer ${
              isSubmitDisabled() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onSubmit}
            disabled={isSubmitDisabled()}
          >
            Calculate
          </Button>
        </div>
      </div>

      {apiData && <BreakdownDisplay data={apiData} />}
    </div>
  );
};

export default PriceCalculator;
