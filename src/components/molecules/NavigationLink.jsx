"use client";
import Link from "next/link";
import { useState } from "react";

const NavigationLink = ({
  active = false,
  label = "Label",
  heroIcon,
  subMenu = [],
  route = "#",
  handleClick = () => {},
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = (e) => {
    if (subMenu.length > 0) {
      e.preventDefault();
      setIsSubMenuOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        onClick={handleClick}
        className="flex w-full items-center justify-between"
      >
        <Link
          href={route}
          onClick={toggleSubMenu}
          className={`group relative flex w-full items-center justify-between overflow-hidden rounded-md px-4 py-2.5 transition-all duration-100 ${
            active
              ? "bg-dark text-white"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          } `}
        >
          {/* Content shifts right when stripe grows */}
          <div className={`text-md flex items-center gap-2`}>
            <i className={`${heroIcon} text-[18px] font-extralight`}></i>
            <span className="text-[13px] tracking-wide text-nowrap capitalize">
              {label}
            </span>
          </div>

          {/* Submenu arrow */}
          {subMenu.length > 0 && (
            <span className="text-[12px] transition-all duration-100">
              <i
                className={`${active ? " " : ""} ${
                  isSubMenuOpen
                    ? "ri-arrow-down-s-line text-lg font-light"
                    : "ri-arrow-right-s-line text-lg font-light"
                } ri-lg`}
              ></i>
            </span>
          )}
        </Link>
      </div>

      {subMenu.length > 0 && (
        <div
          className={`-mt-9 flex-col gap-1 ps-6 ${
            isSubMenuOpen ? "flex" : "hidden"
          }`}
        >
          {subMenu.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className="hover:text-light -ml-2 flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-900 transition-all duration-100 hover:bg-blue-600"
            >
              <i className={`${item.icon} ri font-light`}></i>
              <span className="text-[13px] font-medium capitalize">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationLink;
