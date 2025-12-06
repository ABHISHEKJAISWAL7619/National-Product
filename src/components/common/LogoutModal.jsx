import { Button } from "./Button";
import { TfiFaceSad } from "react-icons/tfi";
export const LogoutModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="mx-auto w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl md:w-full md:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 md:h-14 md:w-14">
        <TfiFaceSad className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
        Logout Confirmation
      </h2>
      <p className="mt-2 text-xs text-gray-500 md:text-sm">
        Are you sure you want to logout? You&apos;ll be redirected to the login
        page.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button variant="outline bg-gray-300 cursor-pointer" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="cursor-pointer" onClick={onConfirm}>
          Logout
        </Button>
      </div>
    </div>
  );
};
