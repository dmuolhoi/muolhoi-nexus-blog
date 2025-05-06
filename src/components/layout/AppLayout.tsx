
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import { cn } from "@/lib/utils";
import PageHeader from "./PageHeader";

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-dm-white">
      <PageHeader />
      <main
        className={cn(
          "flex-1 px-4 py-6 container max-w-6xl transition-all duration-300",
          isAdmin ? "pb-20" : "pb-24"
        )}
      >
        {children || <Outlet />}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default AppLayout;
