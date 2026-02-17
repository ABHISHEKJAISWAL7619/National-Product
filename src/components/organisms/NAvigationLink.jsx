"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NavigationLink = ({
  label,
  icon,
  route = "#",
  hasChildren = false,
  subMenu = [],
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isParentActive = pathname === route;
  const isChildActive = subMenu.some(
    (item) => pathname === item.route
  );

  // Auto-open parent if any child is active
  useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [isChildActive]);

  const handleClick = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  return (
    <li className="w-full">
      {/* ================= PARENT ================= */}
      <Link
        href={route}
        onClick={handleClick}
        className={`
          group flex items-center justify-between
          px-4 py-2 rounded-md mt-2 text-sm font-medium
          transition-all duration-300 ease-out
          hover:scale-[1.01]
          ${isParentActive
            ? "bg-blue-100 text-blue-900 shadow-md border border-blue-200"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}
        `}
      >
        <span className="flex items-center gap-2">
          <i
            className={`${icon} text-lg transition-transform group-hover:scale-110`}
          />
          {label}
        </span>

        {hasChildren && (
          <i
            className={`ri-arrow-drop-down-fill text-2xl
              transition-all duration-300
              ${open ? "rotate-180 text-blue-700" : "text-slate-400"}
            `}
          />
        )}
      </Link>

      {/* ================= CHILDREN ================= */}
      {hasChildren && (
        <ul
          className={`
            space-y-2 pl-3 overflow-hidden
            transition-all duration-300
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
          style={{
            animation: open
              ? "slideDown 0.25s ease-out"
              : "slideUp 0.2s ease-in",
          }}
        >
          {subMenu.map((item, i) => {
            const isActiveChild = pathname === item.route;

            return (
              <li
                key={i}
                className="transition-all duration-300 hover:translate-x-1 mt-2"
              >
                <Link
                  href={item.route}
                  className={`
                    block px-3 py-3 rounded text-xs font-medium
                    transition-all duration-300
                    ${isActiveChild
                      ? "bg-blue-50 text-blue-800 shadow border border-blue-100"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                  `}
                >
                  <span className="flex items-center gap-2 text-[0.9rem]">
                    <i className={`${item.icon ?? icon}`} />
                    {item.label ?? label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default NavigationLink;
