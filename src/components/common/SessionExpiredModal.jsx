"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/auth-slice";
import { setSessionExpired } from "@/redux/slice/session-slice";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";
const SessionExpiredModal = () => {
  const dispatch = useDispatch();
  const { sessionExpired } = useSelector((state) => state.session);
  const router = useRouter();
  if (!sessionExpired) return null;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setSessionExpired(false));
    router.replace("/auth/signin");
  };

  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="mx-auto w-[90%] max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl md:w-full md:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 md:h-14 md:w-14">
          <AlertCircle /> {/* Optional: Use an alert icon like */}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 md:text-xl">
          Session Expired
        </h2>
        <p className="text-xs text-gray-500 md:text-sm">
          Your session has expired due to inactivity. Please log in again to
          continue.
        </p>

        <Button
          onClick={handleLogout}
          className="w-full cursor-pointer rounded-full bg-black py-2.5 text-white"
        >
          Login Again
        </Button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
