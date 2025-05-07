
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, BookOpen, User, LogIn, Grid } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const BottomNavBar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Reorganized nav items as requested: about, blog, home, projects, login
  const navItems = [
    {
      name: "About",
      path: "/about",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <Grid className="h-5 w-5" />,
    },
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
    <nav className="fixed bottom-0 left-0 right-0 border-t border-dm-gray200 bg-white py-2 px-4 z-10 shadow-nav">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "nav-item transition-all duration-300",
                  active 
                    ? "text-dm-primary nav-item-active" 
                    : "text-dm-gray500 hover:text-dm-gray700"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center p-1 mb-1 rounded-full",
                  active && "bg-dm-gray100"
                )}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavBar;
