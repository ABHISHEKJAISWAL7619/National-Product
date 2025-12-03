"use client";

import { useState } from "react";

const notificationItems = [
  {
    key: "orderConfirmations",
    title: "Order Confirmations",
    desc: "Receive an email when your order is successfully placed.",
  },
  {
    key: "shipmentUpdates",
    title: "Shipment Updates",
    desc: "Get notified about status changes for your shipments, including tracking info.",
  },
  {
    key: "newProduct",
    title: "New Product Announcements",
    desc: "Receive updates about new arrivals and product launches from our vendors.",
  },
  {
    key: "promotions",
    title: "Promotional Offers",
    desc: "Get exclusive deals and special promotions directly in your inbox.",
  },
  {
    key: "dailySales",
    title: "Daily Sales Reports",
    desc: "Receive a summary of your daily sales and order activities.",
  },
  {
    key: "lowStock",
    title: "Low Stock Alerts",
    desc: "Get alerts when your inventory for a product is running low.",
  },
];

const EmailNotifications = () => {
  const [settings, setSettings] = useState({
    orderConfirmations: true,
    shipmentUpdates: true,
    newProduct: false,
    promotions: false,
    dailySales: true,
    lowStock: true,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="mx-auto w-full rounded-lg border border-gray-200 bg-white p-6  mb-6 shadow md:w-9/11">
      <h2 className="text-xl font-semibold">Email Notifications</h2>
      <p className="mt-1 mb-5 text-sm text-gray-500">
        Control what type of emails you receive from Retailer Hub. You can manage alerts for orders, shipments, and promotions.
      </p>

      <div className="divide-y divide-gray-200">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between  gap-3 py-3.5"
          >
            <div>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>

            {/* Toggle Switch */}
          <div>
            <button
              onClick={() => toggleSetting(item.key)}
              className={`flex h-6  w-11 items-center rounded-full  transition cursor-pointer p-0.5 ${
                settings[item.key] ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`h-5 w-5 transform rounded-full bg-white shadow-md duration-300 ${
                  settings[item.key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailNotifications;
