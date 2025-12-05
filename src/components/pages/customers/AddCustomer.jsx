"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@/hooks/useForm";
import { successToast, errorToast } from "@/utils/toastMessage";
import { savecustomer, fetchcustomer } from "@/redux/slice/customer-slice";
import { customerSchema } from "@/validations/customerSchema";
import OverlayModal from "@/components/common/OverlayModal";

const AddCustomer = ({ isOpen, onClose, CustomerId }) => {
  const dispatch = useDispatch();
  const { loading, singlecustomer } = useSelector((s) => s.customer);

  const { formData, handleChange, setFormData, handleSubmit, reset, errors } =
    useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address: {
          country: "",
          city: "",
          zipCode: "",
          address: "",
        },
      },
      schema: customerSchema,
    });

  // --------------------- FETCH SINGLE CUSTOMER ---------------------
  useEffect(() => {
    if (CustomerId) {
      dispatch(fetchcustomer({ id: CustomerId }));
    }
  }, [CustomerId]);

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

  // ------------------------- SUBMIT HANDLER ------------------------
  const onSubmit = async (data) => {
    try {
      await dispatch(savecustomer({ id: CustomerId, formData: data })).unwrap();
      dispatch(fetchcustomer());
      successToast(
        CustomerId
          ? "Customer updated successfully!"
          : "Customer added successfully!"
      );

      reset();
      onClose();
    } catch (err) {
      errorToast(err || "Failed to save customer");
    }
  };

  return (
    <OverlayModal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      showCloseIcon={true}
      modalClass="!max-w-lg px-4"
    >
      <div className="bg-white p-4 rounded">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">
          {CustomerId ? "Update Customer" : "Add New Customer"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={errors.firstName}
              placeholder="Enter first name"
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={errors.lastName}
              placeholder="Enter last name"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              placeholder="Enter email"
            />

            <Input
              label="Mobile"
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              error={errors.mobile}
              placeholder="Enter mobile"
            />
          </div>

          {/* Address Section */}
          <h3 className="font-semibold mt-3">Address</h3>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Country"
              name="address.country"
              value={formData.address.country}
              onChange={(e) => handleChange("address.country", e.target.value)}
              error={errors.address?.country}
              placeholder="Enter country"
            />

            <Input
              label="City"
              name="address.city"
              value={formData.address.city}
              onChange={(e) => handleChange("address.city", e.target.value)}
              error={errors.address?.city}
              placeholder="Enter city"
            />

            <Input
              label="Zip Code"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={(e) => handleChange("address.zipCode", e.target.value)}
              error={errors.address?.zipCode}
              placeholder="Enter zip code"
            />

            <Input
              label="Full Address"
              name="address.address"
              value={formData.address.address}
              onChange={(e) => handleChange("address.address", e.target.value)}
              error={errors.address?.address}
              placeholder="Enter full address"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4   mt-5 justify-end">
            <Button type="button" className="cursor-pointer" onClick={reset}>
              Cancel
            </Button>

            <Button
              type="submit"
              className="cursor-pointer"
              disabled={loading}
              loading={loading}
            >
              {CustomerId ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </OverlayModal>
  );
};

export default AddCustomer;
