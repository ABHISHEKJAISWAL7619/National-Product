"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Calendar, Users } from "lucide-react";
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
  console.log(memberList, documentCount);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth.user);
  // console.log(user);
  const currentUser = user;

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
      errorToast(err.message);
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
    return () => {};
  }, [searchQuery, currPage]);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white px-4 pt-6">
        <div className="mb-3 flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Users size={20} /> Members
            <span className="rounded-full bg-[#FCE7E0] px-2 py-0.5 text-sm text-[#FA8B5C]">
              {documentCount}
            </span>
          </h2>
          <div className="flex w-full flex-col gap-4 md:flex-row md:gap-2 lg:w-fit">
            <Link href="/role-management/member/add-new" className="w-fit">
              <Button
                type="button"
                className="bg-dark  cursor-pointer text-light w-fit"
                icon="ri-add-fill"
              >
                Add New
              </Button>
            </Link>
          </div>
        </div>
        <div className="pb-6">
          <h1 className="text-lg font-semibold text-gray-900">Members List</h1>
          <p className="text-sm text-gray-500">
            View and manage all the members
          </p>
        </div>

        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <SearchBox
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft="search-line"
            placeholder="Search products..."
          />
          {/* <Button
            variant="outline"
            className="flex w-fit items-center justify-center gap-2 rounded-md border-none bg-black px-3 py-2 text-sm text-white"
          >
            Export
            <span>
              <i className="ri-download-2-line"></i>
            </span>
          </Button> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200 text-left font-bold text-black">
                <th className="px-3 py-3">User Info</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Phone</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Active</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(memberList) && memberList.length > 0 ? (
                <>
                  {/* Logged-in user row on top */}
                  {memberList
                    .filter((u) => u._id === user?._id)
                    .map((u, idx) => (
                      <Row
                        key={u._id}
                        data={u}
                        users={[u]}
                        index={0}
                        onDelete={() => {}}
                        currentUser={user}
                      />
                    ))}

                  {/* All other users */}
                  {memberList
                    .filter((u) => u._id !== user?._id)
                    .map((u, idx) => (
                      <Row
                        key={u._id}
                        data={u}
                        users={memberList.filter((u) => u._id !== user?._id)}
                        index={idx}
                        onDelete={handleDeleteClick}
                        currentUser={user}
                      />
                    ))}
                </>
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    No member found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end">
            <Pagination total={documentCount} pageSize={100} />
          </div>
        </div>
      </div>

      <OverlayModal
        onClose={() => setIsDelete(false)}
        isOpen={isDelete}
        showCloseIcon={false}
      >
        <AlertModal
          icon={<i class="ri-delete-bin-5-line font-[300]"></i>}
          iconColor="text-red-600 bg-grey-600 text-4xl"
          title="Delete Confirmation"
          message={
            <span>Are you sure you want to delete {selectedUser?.name} ?</span>
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

const Row = ({ data, users, index, onDelete, currentUser }) => {
  const { _id, name, email, avatar, createdAt, mobile, isVerified } = data;
  const dispatch = useDispatch();
  const [veryfied, setVeryfied] = useState(false);

  const handleToggle = async (id, value) => {
    setVeryfied(!value);
    try {
      await dispatch(
        createOrUpdatemember({
          memberId: id,
          memberData: { isVerified: !value },
        })
      ).unwrap();
      dispatch(fetchmembers({ filters: {} }));
    } catch (err) {
      errorToast(err.message);
    }
  };

  useEffect(() => {
    setVeryfied(isVerified);
  }, [isVerified]);

  const isCurrentUser = currentUser?._id === _id;

  return (
    <tr
      key={_id}
      className={`${
        index !== users.length - 1 ? "border-b" : ""
      } border-gray-200 hover:bg-gray-50`}
    >
      <td className="flex items-center gap-2 px-3 py-3.5">
        <CircleAvatar w="w-[40px]" text="text-sm" name={name} image={avatar} />
        <span className="font-medium text-gray-700">
          {name || `User ${index + 1}`}
        </span>
        {isCurrentUser && (
          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
            You
          </span>
        )}
      </td>
      <td className="px-3 py-3.5 text-gray-500">{email}</td>
      <td className="px-3 py-3.5 text-gray-500">{mobile}</td>
      <td className="px-3 py-3.5 text-gray-500">
        {moment(createdAt).format("DD MMM YYYY")}
      </td>
      <td className="px-3 py-3.5 pr-24">
        <ToggleSwitch
          checked={veryfied}
          onChange={() => handleToggle(_id, isVerified)}
          size="md"
        />
      </td>
      <td className="px-3 py-3.5 text-gray-400">
        {/* {!isCurrentUser && ( */}
        <div className="flex items-center gap-6">
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
          <Trash2
            onClick={() => onDelete(data)}
            size={16}
            className="cursor-pointer text-red-600 hover:text-red-700"
          />
        </div>
        {/* )} */}
      </td>
    </tr>
  );
};
