"use client";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

const SettingsProfile = () => {
  const router = useRouter();
  const handleAdduser = () => {
    router.push("/role-management/member/add-new");
  };

  const handleCreateRole = () => {
    router.push("/role-management/roles/add-new");
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black md:text-3xl">
            Settings
          </h1>
          <p className="pt-1 text-lg text-gray-500 md:text-lg">
            Manage your account settings.
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:justify-end">
          <Button
            onClick={handleAdduser}
            className="w-full bg-[#CCF0EB] text-[##017345]  cursor-pointer md:w-auto"
            icon="ri-user-add-line"
          >
            Add member
          </Button>
          {/* <Button
            onClick={handleAddAdmin}
            className="w-full bg-[#FFEBDD] text-[#FC6803] hover:bg-[#e5d1c3] md:w-auto"
            icon="ri-user-add-line"
          >
            Add Admin
          </Button> */}
          <Button
            onClick={handleCreateRole}
            className="w-full bg-[#A5D4FE] cursor-pointer text-[#014C8C] hover:bg-[#7dbef7] md:w-auto"
            icon="ri-user-add-line"
          >
            Create Role
          </Button>
        </div>
      </div>
      {/* <div className="mx-auto w-full pt-6 md:w-9/11">
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Profile Details</h2>
          <p className="mb-4 text-sm text-gray-500">
            Update your personal information and contact details. This
            information will be used for order confirmations and communication.
          </p>

          <div className="space-y-4 pt-6 pb-4 md:pl-10">
            <Inputs label="Name" type="text" placeholder="Retailer Hub User" />
            <Inputs
              label="Email"
              type="email"
              placeholder="user.retailer@example.com"
              className="w-full"
            />
            <div className="flex justify-end pt-3">
              <Button className="w-full bg-[#A5D4FE] text-[#014C8C] hover:bg-[#7dbef7] md:w-3/16 md:py-2.5">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SettingsProfile;
