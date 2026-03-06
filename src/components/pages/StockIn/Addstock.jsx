"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useForm } from "@/hooks/useForm";
import { successToast, errorToast } from "@/utils/toastMessage";
import { fetchitems } from "@/redux/slice/Item-slice";
import {
  createincoming,
  updateincoming,
  fetchincomingbyid,
} from "@/redux/slice/incoming-slice";
import { incomingSchema } from "@/validations/incomingSchema";
import Select from "@/components/atoms/Select";
import { useRouter } from "next/navigation";
import { fetchMainCategories } from "@/redux/slice/main-category";
import { fetchSubCategories } from "@/redux/slice/SubCategory";
const CreateStock = ({ incomingId }) => {
  const [localSubcategoryByRow, setLocalSubcategoryByRow] = useState({});
  const [localItemByRow, setLocalItemByRow] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const { itemList } = useSelector((state) => state.item);
  const { categoryList } = useSelector((state) => state.category);
  const { SubcategoryList } = useSelector((state) => state.subcategory);
  const { loading, singleincoming } = useSelector((state) => state.incoming);
  // console.log(singleincoming);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        date: "",
        invoiceNo: "",
        price: "",
        products: [
          {
            itemId: "",
            quantity: "",
            isPieces: false,
            pieces: "",
            categoryId: "",
            subCategoryId: "",
          },
        ],
      },
      schema: incomingSchema,
    });

  useEffect(() => {
    dispatch(fetchitems({ filters: { limit: 200 } }));
  }, [dispatch]);

  useEffect(() => {
    if (!singleincoming && incomingId) {
      dispatch(fetchincomingbyid({ incomingId }));
    }
  }, [dispatch, incomingId]);

  useEffect(() => {
    if (!incomingId) return;
    if (!singleincoming?._id) return;

    const incoming = singleincoming;

    setFormData({
      date: incoming.date?.split("T")[0] || "",
      invoiceNo: incoming.invoiceNo || "",
      price: incoming.price || "",

      products: incoming.products
        .filter((p) => p.item && p.item._id)
        .map((p) => ({
          itemId: p.item._id,
          quantity: p.quantity || "",
          isPieces: !!p.pieces,
          pieces: p.pieces || "",
        })),
    });
  }, [incomingId, singleincoming, setFormData]);

  const addProduct = () =>
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { itemId: "", quantity: "", isPieces: false, pieces: "" },
      ],
    }));

  const removeProduct = (index) =>
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));

  const onSubmit = async (data) => {
    const formatted = {
      date: data.date,
      invoiceNo: data.invoiceNo,
      price: data.price,
      products: data.products.map((p) => {
        // selected product find karo
        const selectedItem = itemList.find((item) => item._id === p.itemId);

        return {
          item: p.itemId,
          quantity: Number(p.quantity),
          pieces: p.isPieces ? Number(p.pieces) : 0,

          // selected item se value lo
          availableQty: selectedItem?.quantity || 0,
          availablePieces: selectedItem?.pieces || 0,
        };
      }),
    };
    // console.log(formatted)

    try {
      if (incomingId) {
        await dispatch(
          updateincoming({ incomingId, incomingData: formatted }),
        ).unwrap();
        router.push("/incoming/stock-in");
        successToast("Stock Updated!");
      } else {
        await dispatch(createincoming(formatted)).unwrap();
        successToast("Incoming Stock Added!");
      }
      reset();
    } catch (err) {
      errorToast(err?.message || "Failed to save");
    }
  };

  // fetching categories
  useEffect(() => {
    dispatch(fetchMainCategories({ filters: { limit: 200 } }));
  }, [dispatch]);

  useEffect(() => {
    formData.products.forEach(async (row, idx) => {
      if (!row.categoryId) return;

      try {
        const res = await dispatch(
          fetchSubCategories({
            filters: { category: row.categoryId, limit: 200 },
          }),
        ).unwrap();

        setLocalSubcategoryByRow((prev) => ({
          ...prev,
          [idx]: res?.data || [],
        }));
      } catch (e) {
        // console.log("Subcategory fetch error", e);
      }
    });
  }, [formData.products, dispatch]);

  // items

  useEffect(() => {
    formData.products.forEach(async (row, idx) => {
      if (!row.categoryId && !row.subCategoryId) return;

      const filters = { limit: 200 };

      if (row.subCategoryId) {
        filters.subcategory = row.subCategoryId;
      } else if (row.category) {
        filters.category = row.categoryId;
      }

      try {
        const res = await dispatch(fetchitems({ filters })).unwrap();

        setLocalItemByRow((prev) => ({
          ...prev,
          [idx]: res?.data || [],
        }));
      } catch (e) {}
    });
  }, [formData.products, dispatch]);
  // end

  console.log(formData, "formData");

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 max-w-4xl mx-auto mt-6">
      <h1 className="font-bold text-2xl md:text-3xl text-black mb-6">
        {incomingId ? "Update Incoming Stock" : "Add Incoming Stock"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-black">
        {/* DATE + INVOICE */}
        <div className="grid grid-cols-1 px-5 md:grid-cols-2 gap-5">
          <Input
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={errors.date}
          />

          <Input
            type="text"
            label="Invoice Number"
            value={formData.invoiceNo}
            onChange={(e) => handleChange("invoiceNo", e.target.value)}
            placeholder="Enter invoice number"
            error={errors.invoiceNo}
          />
        </div>

        {/* PRODUCT LIST */}
        {formData.products.map((product, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg  md:p-5 bg-gray-50 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* category select - for item filteration only  */}
              <Select
                label="Category"
                value={product.categoryId}
                options={
                  categoryList?.map((c) => ({
                    label: c.category,
                    value: c._id,
                  })) || []
                }
                onChange={(v) => {
                  handleChange(`products.${i}.categoryId`, v);
                  handleChange(`products.${i}.subCategoryId`, "");
                  handleChange(`products.${i}.itemId`, "");
                }}
              />

              <Select
                label="Subcategory"
                value={product.subCategoryId}
                options={(localSubcategoryByRow[i] || []).map((s) => ({
                  label: s.name,
                  value: s._id,
                }))}
                onChange={(v) => {
                  handleChange(`products.${i}.subCategoryId`, v);
                  handleChange(`products.${i}.itemId`, "");
                }}
              />
              {/* end  */}

              <Select
                label="Select Item"
                value={product.itemId}
                // options={
                //   itemList?.map((item) => ({
                //     label: item.productName,
                //     value: item._id,
                //   })) || []
                // }
                options={(localItemByRow[i] || []).map((i) => ({
                  label: i.productName,
                  value: i._id,
                }))}
                onChange={(value) =>
                  handleChange(`products.${i}.itemId`, value)
                }
                error={errors.products?.[i]?.itemId}
              />

              <Input
                type="number"
                label="KG Quantity"
                value={product.quantity}
                onChange={(e) =>
                  handleChange(`products.${i}.quantity`, Number(e.target.value))
                }
                error={errors.products?.[i]?.quantity}
              />
            </div>

            {/* Pieces Checkbox */}
            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={product.isPieces}
                onChange={(e) =>
                  handleChange(`products.${i}.isPieces`, e.target.checked)
                }
              />
              Add Pieces?
            </label>

            {/* PIECES INPUT */}
            {product.isPieces && (
              <Input
                type="number"
                label="Pieces"
                value={product.pieces}
                onChange={(e) =>
                  handleChange(`products.${i}.pieces`, Number(e.target.value))
                }
                error={errors.products?.[i]?.pieces}
              />
            )}

            {/* REMOVE BUTTON */}
            {formData.products.length > 1 && (
              <div>
                <Button
                  type="button"
                  className="bg-red-600 text-white w-full md:w-auto"
                  onClick={() => removeProduct(i)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* ADD PRODUCT BUTTON */}
        <Button
          type="button"
          onClick={addProduct}
          className="bg-gray-700 text-white w-full md:w-auto"
        >
          + Add Product
        </Button>

        {/* TOTAL PRICE */}
        <div className="grid grid-cols-1 md:grid-cols-1 px-5 gap-5">
          <Input
            type="number"
            label="Total Price"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter price"
            error={errors.price}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button
            onClick={() => reset()}
            className="cursor-pointer !bg-[#00AEEF] text-white w-full sm:w-auto"
            type="cancel"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-blue-700 cursor-pointer text-white w-full sm:w-auto"
            loading={loading}
          >
            {incomingId ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateStock;
