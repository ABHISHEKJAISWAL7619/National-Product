"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/atoms/Select";
import { useForm } from "@/hooks/useForm";
import { memberSchema } from "@/validations/memberSchema";
import { fetchRoles } from "@/redux/slice/role-slice";
import { errorToast, successToast } from "@/utils/toastMessage";

import {
  createOrUpdatemember,
  fetchSinglemember,
} from "@/redux/slice/member-slice";

const AddNew = ({ memberId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { roleList } = useSelector((state) => state.role);
  const { loading, singlemember } = useSelector((state) => state.member);

  const { formData, handleChange, handleSubmit, errors, setFormData, reset } =
    useForm({
      defaultValues: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        roleId: "",
        isVerified: true,
        address: {
          state: "",
          city: "",
          zip: "",
          address: "",
        },
      },
      schema: memberSchema,
      context: { isEdit: Boolean(memberId) },
    });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(
        createOrUpdatemember({
          memberId,
          memberData: {
            ...data,
            role: "admin",
          },
        })
      ).unwrap();
      successToast("user created successfully");
      reset();

      if (memberId) router.replace("/role-management/member");
    } catch (error) {
      errorToast(error?.message || "Failed to save member");
    }
  };

  const getSingleUser = async (id) => {
    try {
      const res = await dispatch(fetchSinglemember({ memberId: id })).unwrap();

      const { name, mobile, email, roleId, isVerified, address } = res;

      setFormData({
        name: name || "",
        mobile: mobile || "",
        email: email || "",
        password: "",
        roleId: roleId || "", // <-- FIXED
        isVerified,
        address: {
          state: address?.state || "",
          city: address?.city || "",
          zip: address?.zip || "",
          address: address?.address || "",
        },
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (memberId) getSingleUser(memberId);
  }, [memberId]);

  useEffect(() => {
    dispatch(fetchRoles({ filter: {} }));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <Link href="/role-management/member">
        <Button
          type="button"
          className="w-fit cursor-pointer bg-[#CCF0EB] py-2 text-[#017345] hover:bg-[#bde1dd]"
          icon="ri-user-add-line"
        >
          See all members
        </Button>
      </Link>

      <div className="rounded-lg border border-gray-200 p-5 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <h1 className="text-lg font-semibold text-[#204071]">
              General Information
            </h1>
            <p className="text-sm text-gray-500">
              Fill member details such as name, address, mobile and role
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />

            <Input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              error={errors.mobile}
            />

            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />

            <Input
              label="Role"
              type="select"
              options={roleList}
              valueKey="_id"
              labelRender={(opt) => opt.role}
              placeholderOption="Select Role"
              name="roleId"
              value={formData.roleId}
              onChange={(e) => handleChange("roleId", e.target.value)}
              error={errors.roleId}
            />

            <Select
              label=" Status"
              options={[
                { label: "Verified", value: true },
                { label: "Unverified", value: false },
              ]}
              name="isVerified"
              value={formData.isVerified}
              onChange={(e) =>
                handleChange("isVerified", e.target.value === "true")
              }
              error={errors.isVerified}
            />

            <Input
              placeholder="State"
              name="address.state"
              value={formData.address.state}
              onChange={(e) => handleChange("address.state", e.target.value)}
              error={errors?.address?.state}
            />

            <Input
              placeholder="City"
              name="address.city"
              value={formData.address.city}
              onChange={(e) => handleChange("address.city", e.target.value)}
              error={errors?.address?.city}
            />

            <Input
              placeholder="Zip Code"
              name="address.zip"
              value={formData.address.zip}
              onChange={(e) => handleChange("address.zip", e.target.value)}
              error={errors?.address?.zip}
            />

            <Input
              placeholder="Full Address"
              name="address.address"
              value={formData.address.address}
              onChange={(e) => handleChange("address.address", e.target.value)}
              error={errors?.address?.address}
            />
          </div>

          <div className="flex justify-end">
            <Button
              loading={loading}
              disabled={loading}
              type="submit"
              className="bg-dark cursor-pointer h-[50px] w-fit text-white"
              icon="ri-add-circle-line"
            >
              {memberId ? "Save Changes" : "Create Member"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
