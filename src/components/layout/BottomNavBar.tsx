
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BookOpen, SquareStack, FileText, Shield, User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const BottomNavBar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <SquareStack className="h-5 w-5" />,
    },
    {
      name: "Terms",
      path: "/terms",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Privacy",
      path: "/privacy",
      icon: <Shield className="h-5 w-5" />,
    }
  ];

  // Add login link if user is not logged in
  if (!user) {
    navItems.push({
      name: "Login",
      path: "/login",
      icon: <LogIn className="h-5 w-5" />,
    });
  }
  
  // Add admin link if user is admin
  if (isAdmin) {
    navItems.push({
      name: "Admin",
      path: "/admin",
      icon: <User className="h-5 w-5" />,
    });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-dm-gray200 bg-dm-white py-2 px-4 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-col items-center p-2 transition-colors",
              isActive(item.path)
                ? "text-dm-black"
                : "text-dm-gray500 hover:text-dm-gray700"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;
