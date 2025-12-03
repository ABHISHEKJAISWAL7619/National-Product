"use client";
import { Button } from "~/components/atoms/Button";
import Inputs from "~/components/atoms/Inputs";
const Security = () => {
  return (
    <>
      <div className="mx-auto w-full md:w-9/11">
        {/* Profile Details Card */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-2 text-lg font-semibold">Security</h2>
          <p className="mb-4 text-sm text-gray-500">
            Change your password and manage account security settings to keep
            your account safe. We recommend using a strong, unique password.
          </p>

          <div className="space-y-4 pt-6 pb-4 md:pl-12">
                <Inputs
                  label="Current Password"
                  type="password"
                  placeholder="Current Password"
                />
                <Inputs
                  label="New Password"
                  type="password"
                  placeholder="New Password"
                />
                <Inputs
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm New Password"
                />
            <div className="flex justify-end pt-3">
              <Button className="bg-[#A5D4FE]  md:py-2.5 text-lg text-[#014C8C] hover:bg-[#7dbef7] w-full md:w-3/14">
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
