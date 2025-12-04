"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/hooks/useForm";
import { successToast, errorToast } from "@/utils/toastMessage";
import { savecustomer, fetchcustomer } from "@/redux/slice/customer-slice";
import { customerSchema } from "@/validations/customerSchema";

const AddNewCustomer = ({ CustomerId }) => {
  const dispatch = useDispatch();
  const { loading, singlecustomer } = useSelector((s) => s.customer);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: { country: "", city: "", zipCode: "", address: "" },
      },
      schema: customerSchema,
    });

  const onSubmit = async (data) => {
    try {
      await dispatch(savecustomer({ id: CustomerId, formData: data })).unwrap();
      successToast(
        CustomerId
          ? "Customer updated successfully !"
          : "Customer added successfully"
      );
      reset();
    } catch (err) {
      errorToast(err || "Failed to save customer");
    }
  };

  useEffect(() => {
    if (CustomerId) dispatch(fetchcustomer({ id: CustomerId }));
  }, [CustomerId, dispatch]);

  useEffect(() => {
    if (singlecustomer && CustomerId) {
      setFormData({
        firstName: singlecustomer.firstName || "",
        lastName: singlecustomer.lastName || "",
        email: singlecustomer.email || "",
        mobile: singlecustomer.mobile || "",
        address: {
          country: singlecustomer.address?.country || "",
          city: singlecustomer.address?.city || "",
          zipCode: singlecustomer.address?.zipCode || "",
          address: singlecustomer.address?.address || "",
        },
      });
    }
  }, [singlecustomer, CustomerId]);

  return (
    <div className="p-4 md:p-6 lg:px-20 lg:py-8 bg-white border border-gray-200 rounded-lg shadow">
      <h1 className="font-bold text-black text-2xl mb-5">
        {CustomerId ? "Update Customer" : "Add New Customer"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          <Input
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
          <Input
            label="Mobile"
            type="number"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            error={errors.mobile}
          />
        </div>

        {/* Address */}
        <h2 className="font-semibold mt-6 text-black mb-2">Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          <Input
            label="Country"
            type="text"
            value={formData.address.country}
            onChange={(e) => handleChange("address.country", e.target.value)}
            error={errors.address?.country}
          />
          <Input
            label="City"
            type="text"
            value={formData.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
            error={errors.address?.city}
          />
          <Input
            label="Zip Code"
            type="text"
            value={formData.address.zipCode}
            onChange={(e) => handleChange("address.zipCode", e.target.value)}
            error={errors.address?.zipCode}
          />
          <Input
            label="Full Address"
            type="text"
            value={formData.address.address}
            onChange={(e) => handleChange("address.address", e.target.value)}
            error={errors.address?.address}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => reset()}
            type="cancel"
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto cursor-pointer"
            type="submit"
            disabled={loading}
            loading={loading}
          >
            {CustomerId ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCustomer;
