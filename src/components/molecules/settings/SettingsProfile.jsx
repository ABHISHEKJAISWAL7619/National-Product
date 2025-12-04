"use client";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

const SettingsProfile = () => {
  const router = useRouter();

  const handleAddUser = () => {
    router.push("/role-management/member/add-new");
  };

  const handleCreateRole = () => {
    router.push("/role-management/roles/add-new");
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black md:text-3xl">
            Settings
          </h1>
          <p className="pt-1 text-gray-500 text-base md:text-lg">
            Manage your account settings.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-4 mt-2 md:mt-0">
          <Button
            onClick={handleAddUser}
            className="w-full md:w-auto bg-[#CCF0EB] text-[#017345] hover:bg-[#b2e8dc] transition-colors duration-200"
            icon="ri-user-add-line"
          >
            Add Member
          </Button>

          <Button
            onClick={handleCreateRole}
            className="w-full md:w-auto bg-[#A5D4FE] text-[#014C8C] hover:bg-[#7dbef7] transition-colors duration-200"
            icon="ri-user-add-line"
          >
            Create Role
          </Button>
        </div>
      </div>

      {/* Optional Profile Details Section */}
      {/* Uncomment if needed */}
      {/*
      <div className="mt-6 w-full md:w-10/12 lg:w-9/12 mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
          <p className="text-sm text-gray-500 mb-4">
            Update your personal information and contact details. This
            information will be used for order confirmations and communication.
          </p>

          <div className="space-y-4">
            <Inputs label="Name" type="text" placeholder="Retailer Hub User" />
            <Inputs label="Email" type="email" placeholder="user.retailer@example.com" />

            <div className="flex justify-end pt-2">
              <Button className="bg-[#A5D4FE] text-[#014C8C] hover:bg-[#7dbef7] w-full md:w-48">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default SettingsProfile;
