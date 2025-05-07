
import React, { useEffect } from "react";
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
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-dm-light">
      <PageHeader />
      <main
        className={cn(
          "flex-1 px-4 py-6 container max-w-screen-lg mx-auto transition-all duration-300",
          isAdmin ? "pb-20" : "pb-24"
        )}
      >
        <div className="animate-slide-in">
          {children || <Outlet />}
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default AppLayout;
