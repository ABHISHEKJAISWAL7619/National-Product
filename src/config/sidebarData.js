
export const sidebarData = [
  {
    section: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: "ri-dashboard-3-line",
        path: "/",
      },
      {
        title: "Price Calculator",
        icon: "ri-price-tag-3-line",
        path: "/price-calculater",
      },
      {
        title: "Inventory",
        icon: "ri-archive-stack-line",
        path: "/inventory",
      },
      {
        title: "Work in Progress",
        icon: "ri-tools-line",
        path: "/work-in-progress",
      },
      {
        title: "Dispatch",
        icon: "ri-truck-line",
        path: "/dispatch",
      },
      {
        title: "Summary",
        icon: "ri-file-list-3-line",
        path: "/summary",
      },
    ],
  },
  {
    section: "MANAGEMENT",
    items: [
      {
        title: "Item Master",
        icon: "ri-box-3-line",
        path: "/item-master",
        collapsible: true,
        children: [
          { title: "View Item", path: "/item-master/view-item" },
          { title: "Composition", path: "/item-master/composition" },
          { title: "Create Category", path: "/item-master/create-catgory" },
          {
            title: "Create SubCategory",
            path: "/item-master/create-subcategory",
          },
        ],
      },
      {
        title: "Incoming",
        icon: "ri-download-2-line",
        path: "/incoming",
        collapsible: true,
        children: [
          { title: "View Stock In", path: "/incoming/stock-in" },
          { title: "Add Incoming", path: "/incoming/create-stock" },
        ],
      },
      {
        title: "Batch",
        icon: "ri-stack-line",
        path: "/batch",
        collapsible: true,
        children: [
          { title: "View Batch", path: "/batch" },
          { title: "Create Batch", path: "/batch/create-batch" },
        ],
      },
      {
        title: "Production",
        icon: "ri-building-2-line",
        path: "/production",
        collapsible: true,
        children: [
          { title: "Production Management", path: "/production" },
          { title: "Add Production", path: "/production/add-production" },
          { title: "Production Level2", path: "/production/production-level2" },
        ],
      },
      {
        title: "Customers",
        icon: "ri-group-line",
        path: "/customers",
      },
      {
        title: "Role Management",
        icon: "ri-shield-user-line",
        path: "/role-management",
      },
      {
        title: "Logout",
        icon: "ri-logout-box-r-line",
        path: "#",
      },
    ],
  },
];
