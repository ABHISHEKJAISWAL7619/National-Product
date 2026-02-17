"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import OverlayModal from "@/components/common/OverlayModal";
import { LogoutModal } from "@/components/common/LogoutModal";
import { fetchUserDetails, logout } from "@/redux/slice/auth-slice";
import { usePathname } from "next/navigation";
import { buildSidebar } from "@/utils/sidebarBuilder";

const RenderIcon = ({ icon }) => {
  if (!icon) return null;

  if (typeof icon === "string" && icon.startsWith("ri-")) {
    return <i className={`${icon} text-[20px]`}></i>;
  }

  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt="icon"
        width={20}
        height={20}
        className="object-contain"
      />
    );
  }

  const IconComponent = icon;
  return <IconComponent size={20} />;
};

export default function Sidebar({ isOpen, onClose }) {
  const [open, setOpen] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth.user);
  console.log(user);
  const pathname = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();

  const toggle = (title) => setOpen(open === title ? null : title);
  const sidebarStructure = buildSidebar(user?.roleId?.entity || []);

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    dispatch(logout());
    router.replace("/auth/signin");
  };

  const menuItems = user?.roleId?.entity || [];
  console.log(menuItems);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
    bg-white text-blue-950 h-full flex flex-col shadow-md transition-transform duration-300 ease-in-out
    fixed top-[64px] left-0 z-50 w-64
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:w-64 lg:w-64
  `}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="text-lg font-semibold text-blue-950">Menu</h2>
          <button onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto mt-4 custom-scroll">
          <ul className="space-y-2 font-nunito font-semibold text-[14px] capitalize mb-2">
            {sidebarStructure.map((section, si) => (
              <div key={si}>
                <p className="px-5 text-xs text-gray-400 uppercase mt-4 mb-2">
                  {section.section}
                </p>

                <ul className="space-y-2">
                  {section.items.map((item, i) => {
                    if (item.subMenu) {
                      const isChildActive = item.subMenu?.some(
                        (child) => child.route === pathname,
                      );

                      const isOpenItem = open === item.label || isChildActive;

                      return (
                        <li key={i}>
                          <button
                            onClick={() => toggle(item.label)}
                            className={`flex items-center justify-between w-full px-5 py-2 rounded-md
  ${
    isOpenItem
      ? "bg-green-100 m-2 text-green-700 font-semibold"
      : "hover:bg-gray-100"
  }
`}
                          >
                            <span className="flex items-center gap-2">
                              <RenderIcon icon={item.icon} />
                              {item.label}
                            </span>

                            <MdArrowDropDown
                              className={`transition-transform ${
                                isOpenItem ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpenItem && (
                            <ul className="ml-8 mt-1 space-y-1">
                              {item.subMenu.map((child, ci) => (
                                <li key={ci}>
                                  <Link
  href={child.route}
  className={`flex items-center gap-2 py-2 rounded-md
    ${
      pathname === child.route
        ? "bg-green-600 text-white mx-3 px-4 shadow-md font-semibold"
        : "hover:bg-gray-100 mx-3 px-4"
    }
  `}
  onClick={onClose}
>
  {/* <RenderIcon icon={child.icon} />   */}
  {child.label}                    
</Link>

                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    }

                    return (
                      <li key={i}>
                       <Link
  href={item.route}
  className={`flex items-center gap-2 py-2 rounded-md
    ${
      pathname === item.route
        ? "bg-green-600 text-white mx-3 px-4 shadow-md font-semibold"
        : "hover:bg-gray-100 mx-3 px-4"
    }
  `}
  onClick={onClose}
>
  <RenderIcon icon={item.icon} /> 
  {item.label}
</Link>

                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </ul>
        </nav>

        {/* Logout Button Always at Bottom */}
        <div className="flex-none mb-4">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex cursor-pointer text-red-500 items-center gap-2 px-5 py-2 text-[15px] text-navy hover:bg-gray-100 w-full text-left"
          >
            <i className="ri-logout-circle-line text-[20px]"></i>
            Logout
          </button>
        </div>
      </aside>

      <OverlayModal
        onClose={() => setIsLogoutModalOpen(false)}
        isOpen={isLogoutModalOpen}
        showCloseIcon={false}
      >
        <LogoutModal
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      </OverlayModal>
    </>
  );
}
