"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Edit3, Trash2, ChevronDown, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcustomer, deletecustomer } from "@/redux/slice/customer-slice";

import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import SearchBox from "@/components/common/SearchBox";
import Pagination from "@/components/common/Pagination";
import { successToast } from "@/utils/toastMessage";

const Allcustomers = ({ searchQuery, currPage }) => {
  const dispatch = useDispatch();
  const { customerList, documentCount } = useSelector(
    (state) => state.customer
  );

  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAllCustomers = () => {
    dispatch(
      fetchcustomer({
        filters: { search: searchQuery, page: currPage, limit: 10 },
      })
    );
  };

  const confirmDelete = (user) => {
    setDeleteUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteUser) return;

    try {
      await dispatch(deletecustomer({ id: deleteUser._id })).unwrap();
      successToast("Customer deleted successfully");
      fetchAllCustomers();
    } catch (err) {
      console.log(err);
    } finally {
      setShowDeleteModal(false);
      setDeleteUser(null);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [dispatch, searchQuery, currPage]);

  return (
    <div className="w-full border border-gray-100 bg-white font-inter">
      {/* Header */}
      <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap">
        <h2 className="font-bold text-2xl sm:text-3xl text-gray-900 whitespace-nowrap">
          All Customers
        </h2>

        <Link href="/customers/add-new">
          <button className="bg-blue-700 cursor-pointer text-white text-sm font-medium flex items-center justify-center gap-1 py-2.5 px-4 rounded-md hover:bg-blue-800 transition">
            + Add New Customer
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-start md:justify-between">
        <SearchBox
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconLeft="search-line"
          placeholder="Search here..."
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                "First Name",
                "Last Name",
                "Email",
                "Mobile",
                "Country",
                "City",
                "Address",
                "Actions",
              ].map((header, i) => (
                <th
                  key={i}
                  className="px-4 sm:px-6 py-3 text-left font-bold bg-gray-100 text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {customerList?.map((cust) => (
              <tr key={cust._id} className="hover:bg-gray-50 text-black">
                <td className="px-4 py-3">{cust.firstName}</td>
                <td className="px-4 py-3">{cust.lastName}</td>
                <td className="px-4 py-3">{cust.email}</td>
                <td className="px-4 py-3">{cust.mobile}</td>
                <td className="px-4 py-3">{cust.address?.country}</td>
                <td className="px-4 py-3">{cust.address?.city}</td>
                <td className="px-4 py-3">{cust.address?.address}</td>

                <td className="px-4 py-3 text-right">
                  <div className="flex items-center space-x-2">
                    {/* Edit */}
                    <Link href={`/customers/${cust._id}`}>
                      <button className="text-blue-600 cursor-pointer p-1 rounded-full hover:bg-blue-50">
                        <Edit3 size={18} />
                      </button>
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => confirmDelete(cust)}
                      className="text-red-600 cursor-pointer p-1 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination pageSize={10} total={documentCount} />
      </div>

      {/* Delete Modal */}
      <OverlayModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <AlertModal
          icon="⚠️"
          title="Delete Confirmation"
          message={
            deleteUser ? (
              <span className="text-sm text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-blue-500">
                  {deleteUser.firstName} {deleteUser.lastName}
                </span>
                ? This action cannot be undone.
              </span>
            ) : (
              "Are you sure you want to delete this customer?"
            )
          }
          buttons={[
            {
              text: "Cancel",
              onClick: () => setShowDeleteModal(false),
              colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
            },
            {
              text: "Delete",
              onClick: handleDelete,
              colorClass: "bg-red-600 text-white hover:bg-red-700",
            },
          ]}
        />
      </OverlayModal>
    </div>
  );
};

export default Allcustomers;
