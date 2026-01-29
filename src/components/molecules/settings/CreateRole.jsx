"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole, fetchRoles } from "@/redux/slice/role-slice";
import { errorToast } from "@/utils/toastMessage";
import { Button } from "@/components/common/Button";
import SearchBox from "@/components/common/SearchBox";
import Pagination from "@/components/common/Pagination";
import OverlayModal from "@/components/common/OverlayModal";
import { AlertModal } from "@/components/common/AlertModel";

const CreateRole = ({ searchquery, currPage }) => {
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [deleteRoleData, setDeleteRoleData] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { roleList, documentCount } = useSelector((state) => state.role);
  console.log(roleList);
  // console.log(documentCount);

  const fetchroles = async () => {
    try {
      let res = await dispatch(
        fetchRoles({
          filter: { search: searchquery || null, page: currPage, limit: 100 },
        })
      );
      // successToast("Role deleted successfully");
    } catch (error) {
      errorToast(error.message);
    }
  };

  useEffect(() => {
    fetchroles();
  }, [searchquery, dispatch, currPage]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteRole({ roleId: id })).unwrap();
      fetchroles();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDelete(false);
      setDeleteRoleData(null);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between pt-1 pb-5">
        <h1 className="text-xl font-semibold text-gray-900">Roles</h1>
        <p className="text-sm text-gray-500">
          Dashboard <i className="ri-arrow-right-s-line" /> Role List
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-6 px-4 text-[#2D2D2D] shadow md:px-6">
        {/* Title */}
        <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <i className="ri-lock-2-line text-xl" /> Roles
          <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-xs text-[#B91C1C]">
            {documentCount}
          </span>
        </h1>
        <h2 className="mt-2.5 text-lg font-semibold text-gray-900">
          Role List
        </h2>
        <p className="-mt-1 text-sm text-gray-500">
          View and manage all the roles
        </p>

        {/* Controls */}
        <div className="my-4 flex flex-col gap-4 md:my-6 md:flex-row md:items-center md:justify-between">
          <Link href="/role-management/roles/add-new">
            <Button
              className="bg-dark text-light cursor-pointer  md:w-auto"
              icon="ri-add-fill"
            >
              Create Role
            </Button>
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row md:items-center">
            <SearchBox
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              iconLeft="search-line"
              placeholder="Search by name..."
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-[#F6F6F6]">
              <th className="w-10 px-4 py-3 text-left">
                <input type="checkbox" className="cursor-pointer" />
              </th>
              <th className="px-4 py-3 text-left text-[1rem] font-medium text-gray-500">
                Name <i className="ri-arrow-up-down-fill text-sm" />
              </th>
              <th className="py-3 pr-4 text-right md:pr-56">
                Actions <i className="ri-arrow-up-down-fill text-sm" />
              </th>
            </tr>
          </thead>
          <tbody>
            {roleList.map(({ _id, role }) => (
              <tr key={_id} className="border-t border-gray-200 text-sm">
                <td className="w-10 px-4 py-3">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td className="px-4 py-3 text-left font-medium text-[#1F2937]">
                  {role}
                </td>
                <td className="py-3 pr-4 text-right md:pr-56">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/role-management/roles/${_id}`}
                      className="cursor-pointer text-blue-500 hover:text-blue-600"
                    >
                      <i className="ri-pencil-fill" />
                    </Link>
                    <span
                      onClick={() => {
                        setIsDelete(true);
                        setDeleteRoleData({ id: _id, name: role });
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    >
                      <i className="ri-delete-bin-line" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-6 flex justify-end text-sm text-gray-500">
          <Pagination total={documentCount} pageSize={10} />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <OverlayModal
        onClose={() => setIsDelete(false)}
        isOpen={isDelete}
        showCloseIcon={false}
      >
        <AlertModal
          icon={<i className="ri-error-warning-line"></i>}
          iconColor="text-red-600 bg-grey-600 text-4xl"
          title="Delete Confirmation"
          message={
            <span>
              Are you sure you want to delete the role{" "}
              <span className="font-semibold text-blue-600">
                "{deleteRoleData?.name}"
              </span>
              ?
            </span>
          }
          buttons={[
            {
              text: "Cancel",
              onClick: () => setIsDelete(false),
              colorClass: "bg-gray-200 text-gray-800 hover:bg-gray-300",
            },
            {
              text: "Delete",
              onClick: () => handleDelete(deleteRoleData?.id),
              colorClass: "bg-red-600 text-white hover:bg-red-700",
            },
          ]}
        />
      </OverlayModal>
    </>
  );
};

export default CreateRole;
