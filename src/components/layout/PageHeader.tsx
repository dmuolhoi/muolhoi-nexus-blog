
import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Search, FileText, X, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const PageHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/") return "DM";
    if (path === "/about") return "About Me";
    if (path === "/projects") return "Projects";
    if (path === "/legal") return "Legal & Resources";
    if (path === "/admin") return "Admin Dashboard";
    if (path.startsWith("/admin/posts/edit")) return "Edit Post";
    if (path === "/admin/posts/new") return "New Post";
    if (path.startsWith("/admin/pages/edit")) return "Edit Page";
    if (path === "/blog") return "Blog";
    if (path.startsWith("/blog/")) return "Post";
    if (path === "/services") return "Services";
    if (path === "/terms") return "Terms of Use";
    if (path === "/privacy") return "Privacy Policy";
    if (path === "/faq") return "FAQ";
    if (path === "/resources") return "Resources";
    if (path === "/login") return "Admin Login";
    
    return "DM";
  };
  
  const isAdminPage = location.pathname.startsWith("/admin");
  const isBlogPage = location.pathname === "/blog";
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Focus the input when search is opened
      setTimeout(() => {
        const searchInput = document.getElementById("searchInput");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };
  
  return (
    <header className={cn(
      "py-4 px-4 border-b border-dm-gray200 bg-white z-10",
      isAdminPage && "sticky top-0 shadow-sm"
    )}>
      <div className="container max-w-screen-lg mx-auto">
        {showSearch ? (
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              id="searchInput"
              type="search"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button type="submit" variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={toggleSearch}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </form>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dm-black flex items-center justify-center text-white font-bold">
                D
              </div>
              <h1 className="text-xl font-bold">{getPageTitle()}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {!isAdminPage && (
                <>
                  <Button asChild variant="ghost" size="sm" className="text-xs">
                    <Link to="/legal">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>Legal</span>
                    </Link>
                  </Button>
                  
                  {isBlogPage && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={toggleSearch}
                    >
                      <Search className="h-[1.2rem] w-[1.2rem]" />
                      <span className="sr-only">Search</span>
                    </Button>
                  )}
                </>
              )}
              
              {isAdmin && user && isAdminPage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center gap-1 rounded-full"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Logout</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
