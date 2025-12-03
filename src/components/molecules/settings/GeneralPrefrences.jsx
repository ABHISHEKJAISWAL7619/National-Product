"use client";

import { useState } from "react";
import { Button } from "~/components/atoms/Button";

const preferenceItems = [
  {
    key: "darkMode",
    title: "Dark Mode Preference",
    desc: "Toggle between light and dark themes for the application interface.",
    type: "toggle",
  },
  {
    key: "languageSelection",
    title: "Language Selection",
    desc: "Choose your preferred language for the application interface.",
    type: "button", // 📌 Render a button instead of toggle
  },
];

const GeneralPrefrences = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    languageSelection: "English",
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-auto mb-12 w-full rounded-lg border border-gray-200 bg-white p-6 shadow md:w-9/11">
      <h2 className="text-xl font-semibold">General Preferences</h2>
      <p className="mt-1 mb-5 text-sm text-gray-500">
        Adjust other application preferences and display settings.
      </p>

      <div className="divide-y divide-gray-200">
        {preferenceItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-2 py-3.5"
          >
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>

            {/* Right side action */}
            {item.type === "toggle" ? (
            <div>
              <button
                onClick={() => toggleSetting(item.key)}
                className={`flex h-6 w-11 cursor-pointer items-center rounded-full p-0.5 transition md:w-11 ${
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
            ) : (
              <Button className="md:py-2.5 text-gray-700 hover:bg-gray-100 w-full md:w-2/13">
                {settings.languageSelection}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralPrefrences;
