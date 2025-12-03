"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import SearchBox from "@/components/common/SearchBox";

const initialRoles = [
  { id: 1, name: "Rohit", email: "r********@gmail.com", role: "Super admin" },
  {
    id: 2,
    name: "Abhishek",
    email: "a******@gmail.com",
    role: "Super adminstrator",
  },
];

const AddAdmin = () => {
  const router = useRouter();
  const handleRole = () => router.push("/settings/add-admin/create-admin");

  return (
    <>
      {/* Header */}
      <div className="flex justify-between pt-1 pb-5">
        <h1 className="text-xl font-semibold text-gray-900">Admins</h1>
        <p className="text-sm text-gray-500">
          Dashboard <i className="ri-arrow-right-s-line" /> Admin List
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-6 px-4 text-[#2D2D2D] shadow md:px-6">
        {/* Title */}
        <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <i className="ri-lock-2-line text-xl" /> Admins
          <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-xs text-[#B91C1C]">
            2
          </span>
        </h1>
        <div className="my-4 flex items-center justify-between gap-2">
          <div>
            <h2 className="mt-2.5 text-lg font-semibold text-gray-900">
              Admin List
            </h2>
            <p className="te`xt-sm -mt-1 text-gray-500">
              View and manage all the admins
            </p>
          </div>

          <div className="flex pb-6 md:justify-end">
            <div className="flex flex-col gap-4 sm:flex-row md:items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Show entries
                <Button className="w-auto md:py-2.5">
                  10 <i className="ri-arrow-down-s-line pl-2" />
                </Button>{" "}
              </div>
              <SearchBox placeholder="Search:" iconRight />
            </div>
          </div>
        </div>
        {/* Controls */}

        {/* Table */}
        <div className="border-bright-gray overflow-auto rounded-lg border">
          <table className="w-[600px] md:w-full">
            <thead>
              <tr className="text-p bg-[#F6F6F6] text-sm">
                <th className="w-10 px-4 py-3 text-left">
                  All <i className="ri-arrow-down-s-line font-light"></i>
                </th>
                <th className="w-10 px-4 py-3 text-left">
                  Name <i className="ri-arrow-down-s-line font-light"></i>
                </th>
                <th className="w-10 px-4 py-3 text-left">
                  Email <i className="ri-arrow-down-s-line font-light"></i>
                </th>
                <th className="w-10 px-4 py-3 text-left">
                  Role <i className="ri-arrow-down-s-line font-light"></i>
                </th>
                <th className="w-10 px-4 py-3 text-left">
                  Action <i className="ri-arrow-down-s-line font-light"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {initialRoles.map((role) => (
                <tr key={role.id} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="cursor-pointer" />
                  </td>
                  <td className="py-3">{role.name}</td>
                  <td className="py-3">{role.email}</td>
                  <td className="py-3">{role.role}</td>

                  <td className="flex items-center gap-2 py-3">
                    <i className="ri-edit-box-line cursor-pointer text-lg font-light text-blue-500 hover:text-blue-600" />
                    <i className="ri-delete-bin-line cursor-pointer text-lg font-light text-red-500 hover:text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <p>Showing 1 to 2 of 2 entries</p>
          <div className="flex items-center gap-2">
            <Button className="hover:bg-gray-100">Previous</Button>
            <Button className="bg-dark text-light px-4">1</Button>
            <Button className="hover:bg-gray-100">Next</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
