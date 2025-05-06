
import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const PageHeader = () => {
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/") return "DM";
    if (path === "/admin") return "Admin Dashboard";
    if (path.startsWith("/admin/posts/edit")) return "Edit Post";
    if (path === "/admin/posts/new") return "New Post";
    if (path.startsWith("/admin/pages/edit")) return "Edit Page";
    if (path === "/blog") return "Blog";
    if (path.startsWith("/blog/")) return "Post";
    if (path === "/services") return "Services";
    if (path === "/terms") return "Terms of Use";
    if (path === "/privacy") return "Privacy Policy";
    if (path === "/login") return "Admin Login";
    
    return "DM";
  };
  
  const isAdminPage = location.pathname.startsWith("/admin");
  
  return (
    <header className={cn(
      "py-4 px-4 border-b border-dm-gray200 bg-dm-white z-10",
      isAdminPage && "sticky top-0"
    )}>
      <div className="container flex justify-between items-center">
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
        
        {isAdmin && user && isAdminPage && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut()}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Logout</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
