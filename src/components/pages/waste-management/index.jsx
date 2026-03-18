"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallitems, wasteitems } from "@/redux/slice/Item-slice";
import Select from "@/components/atoms/Select";
import { useToggleQueryParam } from "@/utils/toggleQueryParam";
import Input from "@/components/common/Input";

const WasteManagement = ({ searchQuery, currPage, include, exclude }) => {
  const dispatch = useDispatch();
  const toggleQuery = useToggleQueryParam();

  const { itemList, wasteItemDetails } = useSelector((state) => state.item);
  console.log("waste item details", wasteItemDetails);

  /* -----------------------------
     Fetch items for dropdown
  ------------------------------*/

  useEffect(() => {
    dispatch(
      getallitems({
        filters: {
          search: searchQuery,
          page: currPage,
          limit: 200,
        },
      }),
    );
  }, [dispatch, searchQuery, currPage]);

  /* -----------------------------
     Convert itemList → select options
  ------------------------------*/

  const selectOptions = useMemo(() => {
    return (
      itemList?.map((item) => ({
        label: item.productName,
        value: item._id,
      })) || []
    );
  }, [itemList]);

  /* -----------------------------
     Call Waste API
  ------------------------------*/

  useEffect(() => {
    if (include || exclude) {
      dispatch(
        wasteitems({
          filters: { include, exclude },
        }),
      );
    }
  }, [dispatch, include, exclude]);

  const data = wasteItemDetails || [];

  return (
    <div className="w-full border border-gray-100 bg-white font-inter">
      {/* Header */}

      <div className="p-4 md:p-6 flex flex-col gap-4">
        <h2 className="font-bold text-[25px] text-black">Waste Management</h2>
        {/* Dropdown Filters */}
        <div className="flex gap-4 flex-wrap">
          <Input
            type="select"
            label="Include"
            options={selectOptions}
            valueKey="value"
            labelKey="label"
            value={include || ""}
            placeholderOption="Select Include Item"
            onChange={(e) => toggleQuery("include", e.target.value)}
            className="max-w-[300px]"
          />

          <Input
            type="select"
            label="Exclude"
            options={selectOptions}
            valueKey="value"
            labelKey="label"
            value={exclude || ""}
            placeholderOption="Select Exclude Item"
            onChange={(e) => toggleQuery("exclude", e.target.value)}
            className="max-w-[300px]"
          />
        </div>
      </div>

      {/* Result Section */}

      <div className="p-6">
        {/* Nothing selected */}

        {!include && !exclude ? (
          <p className="text-gray-500 text-sm">
            Please select Include / Exclude item to see waste result
          </p>
        ) : data.length === 0 ? (
          /* Selected but no data */

          <p className="text-red-500 text-sm font-medium">
            No waste found in selected item
          </p>
        ) : (
          /* Data available */

          <div className="space-y-6">
            {data.map((product) => (
              <div
                key={product._id}
                className="rounded-lg p-5 bg-white shadow-sm"
              >
                {/* Product Info */}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {product.productName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Code: {product.productCode}
                  </p>
                </div>

                {/* Waste Summary */}

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Waste</p>
                    <p className="text-red-600 font-semibold text-lg">
                      {product.waste}
                    </p>
                  </div>

                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Reusable</p>
                    <p className="text-green-600 font-semibold text-lg">
                      {product.reusable}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs text-gray-500">Final</p>
                    <p className="text-blue-600 font-semibold text-lg">
                      {product.final}
                    </p>
                  </div>
                </div>

                {/* Composition */}

                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Composition
                  </h4>

                  <div className="space-y-2">
                    {product.compositions?.map((comp) => (
                      <div
                        key={comp._id}
                        className="flex justify-between text-sm pb-1"
                      >
                        <span className="text-gray-700">
                          {comp.item?.productName}
                        </span>

                        <span className="text-gray-500">
                          {comp.item?.symbol}
                        </span>

                        <span className="text-blue-700 font-medium">
                          {comp.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteManagement;
