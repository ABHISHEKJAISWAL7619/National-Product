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
  const groupedMenu = {
    main: [],
    itemMaster: [],
    incoming: [],
    batch: [],
    production: [],
    management: [],
  };

  entities.forEach((item) => {
    const route = item.route || "";

    if (route === "/") {
      groupedMenu.main.push(item);
    } 
    else if (route.startsWith("/item-master")) {
      groupedMenu.itemMaster.push(item);
    } 
    else if (route.startsWith("/incoming")) {
      groupedMenu.incoming.push(item);
    } 
    else if (route.startsWith("/batch")) {
      groupedMenu.batch.push(item);
    } 
    else if (route.startsWith("/production")) {
      groupedMenu.production.push(item);
    } 
    else {
      groupedMenu.management.push(item);
    }
  });

  // 🔥 EMPTY GROUP FILTER LOGIC
  const sidebar = [];

  if (groupedMenu.main.length) {
    sidebar.push({
      section: "MAIN",
      items: groupedMenu.main,
    });
  }

  const managementItems = [];

  if (groupedMenu.itemMaster.length) {
    managementItems.push({
      label: "Item Master",
      icon: "ri-box-3-line",
      subMenu: groupedMenu.itemMaster,
    });
  }

  if (groupedMenu.incoming.length) {
    managementItems.push({
      label: "Incoming",
      icon: "ri-download-2-line",
      subMenu: groupedMenu.incoming,
    });
  }

  if (groupedMenu.batch.length) {
    managementItems.push({
      label: "Batch",
      icon: "ri-stack-line",
      subMenu: groupedMenu.batch,
    });
  }

  if (groupedMenu.production.length) {
    managementItems.push({
      label: "Production",
      icon: "ri-building-2-line",
      subMenu: groupedMenu.production,
    });
  }

  if (groupedMenu.management.length) {
    managementItems.push(...groupedMenu.management);
  }

  // 👉 MANAGEMENT tab sirf tab add hoga jab kuch ho
  if (managementItems.length) {
    sidebar.push({
      section: "MANAGEMENT",
      items: managementItems,
    });
  }

  return sidebar;
};

