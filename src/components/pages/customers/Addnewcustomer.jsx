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
    <div className="p-5 md:p-8 lg:p-10 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="font-bold text-2xl md:text-3xl text-gray-900 mb-6">
        {CustomerId ? "Update Customer" : "Add New Customer"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800  pl-3">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
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
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 pl-3">
            Address Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Country"
              value={formData.address.country}
              onChange={(e) => handleChange("address.country", e.target.value)}
              error={errors.address?.country}
            />
            <Input
              label="City"
              value={formData.address.city}
              onChange={(e) => handleChange("address.city", e.target.value)}
              error={errors.address?.city}
            />
            <Input
              label="Zip Code"
              value={formData.address.zipCode}
              onChange={(e) => handleChange("address.zipCode", e.target.value)}
              error={errors.address?.zipCode}
            />
            <Input
              label="Full Address"
              value={formData.address.address}
              onChange={(e) => handleChange("address.address", e.target.value)}
              error={errors.address?.address}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button
            className="w-full sm:w-auto"
            onClick={() => reset()}
            type="cancel"
          >
            Cancel
          </Button>

          <Button
            className="w-full sm:w-auto"
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
