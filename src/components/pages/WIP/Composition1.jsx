"use client";

import Updateinput from "@/components/atoms/Updateinput";
import { fetchsinglecompositions } from "@/redux/slice/composition-slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RiFileEditLine, RiDeleteBin6Line } from "react-icons/ri";
import Input from "@/components/common/Input";

const Composition1 = ({ compositionId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");

  const fetchcomposition = async () => {
    let res = await dispatch(
      fetchsinglecompositions({ filters: {}, id: compositionId })
    ).unwrap();
    // console.log(res);
    setFormData(res);
  };

  useEffect(() => {
    fetchcomposition();
  }, []);

  if (!formData)
    return <p className="text-gray-500 text-center p-10">Loading details...</p>;

  return (
    <div className="w-full bg-white font-inter">
      <div className="bg-white p-6">
        <div className="max-w-[940px]">
          <div className="flex gap-5">
            <Input
              label="Date"
              type="date"
              value={formData?.date?.split("T")[0]}
              readOnly
            />

            <Input
              label="Batch No"
              type="text"
              value={formData?.batchNo}
              readOnly
            />
          </div>

          <div className="flex  gap-5 mt-4">
            <Input
              label="Product Name"
              type="text"
              value={formData?.outputItem?.productName}
              readOnly
            />
            <Input
              label="Quantity"
              type="text"
              value={formData?.quantity}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <h2 className="font-archivo text-black font-bold text-[25px]">
          Composition
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-black">
            <tr>
              {[
                "Sl No",
                "Material",
                "Percentage",
                "Category",
                "Subcategory",
                // "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-5 text-left font-bold text-md"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {formData?.outputItem?.compositions?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4  text-black text-sm font-medium">
                  {String(index + 1).padStart(2, "0")}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {item?.item?.productName || "-"}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {item?.percentage} %
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {formData?.outputItem?.category?.category || "-"}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {formData?.outputItem?.subcategory?.name || "-"}
                </td>

                {/* <td className="px-6 py-4 text-sm text-gray-400 flex gap-3">
                  <RiFileEditLine
                    className="cursor-pointer hover:text-blue-600"
                    size={18}
                  />
                  <RiDeleteBin6Line
                    className="cursor-pointer hover:text-red-600"
                    size={20}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Composition1;
