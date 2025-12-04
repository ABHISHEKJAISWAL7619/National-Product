"use client";
import { useState } from "react";
import Header from "@/components/organisms/Header";
import Sidebar from "@/components/organisms/Sidebar";
import { useFetchUserOnLoad } from "@/hooks/useFetchUserOnLoad";
import { useSelector } from "react-redux";

export default function MainLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useFetchUserOnLoad();
  const { user } = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header — full width */}
      <Header user={user} onMenuClick={() => setDrawerOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          user={user}
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
