"use client";
import { fetchUserDetails } from "@/redux/slice/auth-slice";
import Image from "next/image";
import { useEffect } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import CircleAvatar from "../common/CircleAvatar";

export default function Header({ onMenuClick, user }) {
  const { name, avatar } = user || {};
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow h-[64px] flex items-center justify-between px-4 md:px-6">
      {/* Left Section — Logo + Menu Button */}
      <div className="flex items-center justify-between gap-3">
        {/* Mobile menu button */}
        <button onClick={onMenuClick} className="md:hidden text-blue-950 p-1.5">
          <GoSidebarCollapse size={26} />
        </button>

        {/* Logo */}
        <Image
          src="/img/npimg.png"
          height={40}
          width={110}
          className="object-contain"
          alt="Company Logo"
        />
      </div>
      <CircleAvatar w=" w-10 " text="text-[14px]" name={name} image={avatar} />
      {/* Search Bar */}
    </header>
  );
}
