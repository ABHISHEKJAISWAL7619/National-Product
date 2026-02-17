// utils/sidebarBuilder.js

export const groupMenuItems = (entities = []) => {
  const groups = {
    main: [],
    itemMaster: [],
    incoming: [],
    batch: [],
    production: [],
    management: [],
  };

  entities.forEach((item) => {
    const route = item.route;

    // MAIN
    if (
      route === "/" ||
      route === "/price-calculater" ||
      route === "/inventory" ||
      route === "/work-in-progress" ||
      route === "/dispatch" ||
      route === "/summary"
    ) {
      groups.main.push(item);
    }

    // ITEM MASTER
    else if (route.startsWith("/item-master")) {
      groups.itemMaster.push(item);
    }

    // INCOMING
    else if (route.startsWith("/incoming")) {
      groups.incoming.push(item);
    }

    // BATCH
    else if (route.startsWith("/batch")) {
      groups.batch.push(item);
    }

    // PRODUCTION
    else if (route.startsWith("/production")) {
      groups.production.push(item);
    }

    // MANAGEMENT
    else {
      groups.management.push(item);
    }
  });

  return groups;
};
export const buildSidebar = (entities = []) => {
  const groupedMenu = groupMenuItems(entities);

  return [
    {
      section: "MAIN",
      items: groupedMenu.main.map((item) => ({
        label: item.label,
        route: item.route,
        icon: item.icon,
        action: item.action,
      })),
    },
    {
      section: "MANAGEMENT",
      items: [
        {
          label: "Item Master",
          icon: "ri-box-3-line",
          collapsible: true,
          subMenu: groupedMenu.itemMaster.map((item) => ({
            label: item.label,
            route: item.route,
            icon: item.icon,
            action: item.action,
          })),
        },
        {
          label: "Incoming",
          icon: "ri-download-2-line",
          collapsible: true,
          subMenu: groupedMenu.incoming.map((item) => ({
            label: item.label,
            route: item.route,
            icon: item.icon,
            action: item.action,
          })),
        },
        {
          label: "Batch",
          icon: "ri-stack-line",
          collapsible: true,
          subMenu: groupedMenu.batch.map((item) => ({
            label: item.label,
            route: item.route,
            icon: item.icon,
            action: item.action,
          })),
        },
        {
          label: "Production",
          icon: "ri-building-2-line",
          collapsible: true,
          subMenu: groupedMenu.production.map((item) => ({
            label: item.label,
            route: item.route,
            icon: item.icon,
            action: item.action,
          })),
        },

        // Customers, Role Management
        ...groupedMenu.management.map((item) => ({
          label: item.label,
          route: item.route,
          icon: item.icon,
          action: item.action,
        })),
      ],
    },
  ];
};
