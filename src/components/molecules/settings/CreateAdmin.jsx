"use client";

import { Button } from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";

const CreateAdmin = () => {
  const router = useRouter();
  const handleAddAdmin = () => {
    router.push("/role-management/add-admin");
  };
  return (
    <>
      <div className="flex justify-between pt-1 pb-5">
        <h1 className="text-xl font-semibold text-gray-900">Create Admins</h1>
        <p className="text-sm text-gray-500">
          Dashboard <i className="ri-arrow-right-s-line" /> Admins
          <i className="ri-arrow-right-s-line" /> Create Admin
        </p>
      </div>
      <div className="border-bright-gray rounded-lg border p-4 shadow">
        <Button className="bg-dark text-light mb-4 w-auto rounded-b-none uppercase hover:bg-blue-600">
          profile details
        </Button>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Input label="Name" placeholder="Insert Name" />
          </div>
          <div></div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input label="Password" placeholder="Insert Password" />
          <Input
            label="Confirm Your Password"
            placeholder="Insert Confirm Your Password"
          />
          <Input label="Email" placeholder="Insert Email" />
          <Select
            label="Role"
            options={["Super Administrator", "Moderator", "Editor"]}
            defaultValue=""
          />
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <Button
            onClick={handleAddAdmin}
            className="bg-dark text-light w-auto hover:bg-purple-700"
            icon="ri-save-3-fill"
          >
            Save
          </Button>
          <Button
            onClick={() => router.back()}
            className="w-auto text-[#374151] hover:bg-gray-100"
            icon="ri-replay-5-line"
          >
            Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateAdmin;
