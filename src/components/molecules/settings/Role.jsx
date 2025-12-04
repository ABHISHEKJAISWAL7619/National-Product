"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { createOrUpdateRole, fetchSingleRole } from "@/redux/slice/role-slice";
import { errorToast, successToast } from "@/utils/toastMessage";

export const menuItems = [
  {
    icon: "ri-dashboard-3-line",
    route: "/",
    name: "dashboard",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-price-tag-3-line",
    route: "/price-calculater",
    name: "price calculator",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-archive-stack-line",
    route: "/inventory",
    name: "inventory",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-tools-line",
    route: "/work-in-progress",
    name: "work in progress",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-truck-line",
    route: "/dispatch",
    name: "dispatch",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-file-list-3-line",
    route: "/summary",
    name: "summary",
    permissions: ["Edit", "View", "Delete", "Create"],
  },

  // MANAGEMENT
  {
    icon: "ri-box-3-line",
    route: "/item-master/view-item",
    name: "view item",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-box-3-line",
    route: "/item-master/composition",
    name: "composition",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-box-3-line",
    route: "/item-master/create-catgory",
    name: "create category",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-box-3-line",
    route: "/item-master/create-subcategory",
    name: "create subcategory",
    permissions: ["Edit", "View", "Delete", "Create"],
  },

  {
    icon: "ri-download-2-line",
    route: "/incoming/stock-in",
    name: "view stock in",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-download-2-line",
    route: "/incoming/create-stock",
    name: "add incoming",
    permissions: ["Edit", "View", "Delete", "Create"],
  },

  {
    icon: "ri-stack-line",
    route: "/batch",
    name: "view batch",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-stack-line",
    route: "/batch/create-batch",
    name: "create batch",
    permissions: ["Edit", "View", "Delete", "Create"],
  },

  {
    icon: "ri-building-2-line",
    route: "/production",
    name: "production management",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-building-2-line",
    route: "/production/add-production",
    name: "add production",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
  {
    icon: "ri-building-2-line",
    route: "/production/production-level2",
    name: "production level2",
    permissions: ["Edit", "View", "Delete", "Create"],
  },

  {
    icon: "ri-group-line",
    route: "/customers",
    name: "customers",
    permissions: ["Edit", "View", "Delete", "Create"],
  },

  {
    icon: "ri-shield-user-line",
    route: "/role-management",
    name: "role management",
    permissions: ["Edit", "View", "Delete", "Create"],
  },
];

const permissionMap = {
  View: "view",
  Edit: "edit",
  Delete: "delete",
  Create: "create",
};

const reversePermissionMap = Object.fromEntries(
  Object.entries(permissionMap).map(([k, v]) => [v, k])
);

export default function RoleForm({ roleId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, singleRole } = useSelector((state) => state.role);

  const [roleName, setRoleName] = useState("");
  const [panel, setPanel] = useState("admin");
  const [allPermissions, setAllPermissions] = useState(false);

  const [permissionState, setPermissionState] = useState(() => {
    return menuItems.reduce((acc, item) => {
      acc[item.name] = {};
      item.permissions.forEach((perm) => {
        acc[item.name][perm] = false;
      });
      return acc;
    }, {});
  });

  const togglePermission = (menu, perm) => {
    setPermissionState((prev) => ({
      ...prev,
      [menu]: {
        ...prev[menu],
        [perm]: !prev[menu][perm],
      },
    }));
  };

  const toggleAllPermissions = () => {
    const updated = menuItems.reduce((acc, item) => {
      acc[item.name] = {};
      item.permissions.forEach((perm) => {
        acc[item.name][perm] = !allPermissions;
      });
      return acc;
    }, {});
    setPermissionState(updated);
    setAllPermissions(!allPermissions);
  };

  const handleSubmit = async (id) => {
    const entity = menuItems.reduce((acc, item) => {
      const selectedPerms = Object.entries(permissionState[item.name])
        .filter(([_, value]) => value)
        .map(([key]) => permissionMap[key]);

      if (selectedPerms.length > 0) {
        acc.push({
          icon: item.icon,
          route: item.route,
          label: item.name.toLowerCase(),
          action: selectedPerms,
        });
      }
      return acc;
    }, []);

    if (entity?.length < 1) {
      errorToast("Select at least one menu & access!");
      return;
    }

    const formData = {
      role: roleName,
      panel,
      entity,
    };

    try {
      await dispatch(
        createOrUpdateRole({ roleData: formData, roleId: id })
      ).unwrap();
      successToast(`Role ${roleId ? "updated" : "created"} successfully`);
      router.push("/role-management/roles");
    } catch (error) {
      errorToast("Failed to save role");
    }
  };

  const getSingleRole = async (id) => {
    try {
      const role = await dispatch(fetchSingleRole({ roleId: id })).unwrap();

      setRoleName(role.role || "");
      setPanel(role.panel || "admin");

      const initialState = menuItems.reduce((acc, item) => {
        acc[item.name] = {};
        item.permissions.forEach((perm) => {
          acc[item.name][perm] = false;
        });
        return acc;
      }, {});

      role.entity.forEach((entityItem) => {
        const itemName = entityItem.label.toLowerCase();
        if (initialState[itemName]) {
          entityItem.action.forEach((apiPerm) => {
            const uiPerm = reversePermissionMap[apiPerm];
            if (uiPerm) initialState[itemName][uiPerm] = true;
          });
        }
      });

      setPermissionState(initialState);
    } catch (error) {
      errorToast("Failed to load role details");
      console.error(error);
    }
  };

  useEffect(() => {
    if (roleId) getSingleRole(roleId);
  }, [roleId]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          {roleId ? "Update Role" : "Create New Role"}
        </h1>
        <Link href="/role-management/roles">
          <Button
            className="bg-[#CCF0EB] cursor-pointer text-[#017345]"
            icon="ri-user-add-line"
          >
            See all roles
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 shadow">
        <div className="p-5 md:p-10">
          <Input
            type="text"
            label="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />

          <div className="flex items-center justify-end gap-2 py-4 text-sm font-semibold text-[#374151] md:py-5">
            <input
              type="checkbox"
              className="h-4 w-4 accent-black"
              checked={allPermissions}
              onChange={toggleAllPermissions}
            />
            <p>All Permissions</p>
          </div>

          <div className="overflow-auto rounded-md border border-gray-200">
            <table className="w-[750px] text-sm md:w-full">
              <thead>
                <tr className="bg-[#F9FAFB] font-medium text-[#374151]">
                  <th className="w-1/3 px-4 py-3 text-left">Menu</th>
                  <th className="px-4 py-3 text-left">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.name}>
                    <td className="border-t border-gray-200 px-4 py-3 font-semibold text-[#1F2937]">
                      {item.name}
                    </td>
                    <td className="border-t border-gray-200 px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {item.permissions.map((perm) => (
                          <label
                            key={perm}
                            className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-1.5 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 accent-black"
                              checked={
                                permissionState[item.name]?.[perm] || false
                              }
                              onChange={() => togglePermission(item.name, perm)}
                            />
                            <span className="text-gray-700">{perm}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end gap-3 md:gap-4">
            <Button
              onClick={() => handleSubmit(roleId)}
              className="bg-dark  cursor-pointer py-2.5 text-white md:w-fit"
              icon="ri-save-3-fill"
              disabled={loading || !roleName}
              loading={loading}
            >
              Save
            </Button>
            <Button
              onClick={() => router.back()}
              className="py-2.5 text-[#374151] cursor-pointer hover:bg-gray-100 md:w-fit"
              icon="ri-replay-5-line"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
