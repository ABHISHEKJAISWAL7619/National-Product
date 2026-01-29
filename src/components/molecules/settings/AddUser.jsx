"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button } from "@/components/common/Button";

import CircleAvatar from "@/components/common/CircleAvatar";
import Pagination from "@/components/common/Pagination";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";
import SearchBox from "@/components/common/SearchBox";
import ToggleSwitch from "@/components/atoms/ToggleSwitch";
import {
  createOrUpdatemember,
  deletemember,
  fetchmembers,
} from "@/redux/slice/member-slice";
import { successToast } from "@/utils/toastMessage";

export default function UsersPage({ searchQuery, currPage }) {
  const dispatch = useDispatch();
  const { memberList, documentCount } = useSelector((state) => state.member);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth.user);

  const handleDeleteClick = (data) => {
    setIsDelete(true);
    setSelectedUser(data);
  };

  const handleDelete = async (id) => {
    try {
      const memberId = id;
      await dispatch(deletemember({ memberId })).unwrap();
      successToast("User deleted successfully");
      dispatch(
        fetchmembers({ filters: { role: "admin", limit: 100, page: currPage } })
      );
      setIsDelete(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    dispatch(
      fetchmembers({
        filters: {
          role: "admin",
          limit: 100,
          search: searchQuery,
          page: currPage || null,
        },
      })
    );
  }, [searchQuery, currPage]);

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow overflow-x-auto">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-900">
            <Users size={20} /> Members
            <span className="rounded-full bg-[#FCE7E0] px-2 py-0.5 text-sm text-[#FA8B5C]">
              {documentCount}
            </span>
          </h2>

          <div className="flex w-full flex-col gap-2 md:flex-row md:gap-2 lg:w-fit">
            <Link
              href="/role-management/member/add-new"
              className="w-full md:w-auto"
            >
              <Button
                type="button"
                className="w-full cursor-pointer md:w-auto bg-dark text-light"
                icon="ri-add-fill"
              >
                Add New
              </Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search by name,email,mobile..."
            className="w-full md:w-64"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 text-left font-bold text-black">
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2 hidden sm:table-cell">Email</th>
                <th className="px-3 py-2 hidden md:table-cell">Phone</th>
                <th className="px-3 py-2 hidden lg:table-cell">Date</th>
                <th className="px-3 py-2 text-center">Active</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberList?.length > 0 ? (
                memberList.map((u, idx) => (
                  <Row
                    key={u._id}
                    data={u}
                    index={idx}
                    onDelete={handleDeleteClick}
                    currentUser={user}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <Pagination total={documentCount} pageSize={100} />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <OverlayModal
        onClose={() => setIsDelete(false)}
        isOpen={isDelete}
        showCloseIcon={false}
      >
        <AlertModal
          icon={<i className="ri-delete-bin-5-line font-[300]"></i>}
          iconColor="text-red-600 bg-grey-600 text-4xl"
          title="Delete Confirmation"
          message={
            <span>Are you sure you want to delete {selectedUser?.name}?</span>
          }
          buttons={[
            {
              text: "Cancel",
              onClick: () => setIsDelete(false),
              colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
            },
            {
              text: "Delete",
              onClick: () => handleDelete(selectedUser?._id),
              colorClass: "bg-red-600 text-white hover:bg-red-700",
            },
          ]}
        />
      </OverlayModal>
    </>
  );
}

const Row = ({ data, index, onDelete, currentUser }) => {
  const { _id, name, email, avatar, createdAt, mobile, isVerified } = data;
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(isVerified);

  const handleToggle = async (id, value) => {
    setVerified(!value);
    try {
      await dispatch(
        createOrUpdatemember({
          memberId: id,
          memberData: { isVerified: !value },
        })
      ).unwrap();
      dispatch(fetchmembers({ filters: {} }));
    } catch (err) {
      console.error(err.message);
    }
  };

  const isCurrentUser = currentUser?._id === _id;

  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50`}>
      <td className="px-3 py-3 flex items-center gap-2 min-w-[150px]">
        <CircleAvatar w="w-10" text="text-sm" name={name} image={avatar} />
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">{name}</span>
          {isCurrentUser && (
            <span className="text-xs text-green-600 font-semibold">You</span>
          )}
        </div>
      </td>
      <td className="px-3 py-3 hidden sm:table-cell text-gray-500 min-w-[150px]">
        {email}
      </td>
      <td className="px-3 py-3 hidden md:table-cell text-gray-500 min-w-[120px]">
        {mobile}
      </td>
      <td className="px-3 py-3 hidden lg:table-cell text-gray-500 min-w-[120px]">
        {moment(createdAt).format("DD MMM YYYY")}
      </td>
      <td className="px-3 py-3 text-center">
        <ToggleSwitch
          checked={verified}
          onChange={() => handleToggle(_id, isVerified)}
          size="md"
        />
      </td>
      <td className="px-3 py-3 text-center">
        <div className="flex justify-center items-center gap-4">
          <Link href={`/role-management/member/${_id}`}>
            <Eye
              size={16}
              className="cursor-pointer text-purple-600 hover:text-purple-700"
            />
          </Link>
          <Link href={`/role-management/member/${_id}`}>
            <Pencil
              size={16}
              className="cursor-pointer text-blue-600 hover:text-blue-700"
            />
          </Link>
          {!isCurrentUser && (
            <Trash2
              onClick={() => onDelete(data)}
              size={16}
              className="cursor-pointer text-red-600 hover:text-red-700"
            />
          )}
        </div>
      </td>
    </tr>
  );
};
