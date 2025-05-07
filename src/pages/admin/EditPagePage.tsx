
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import PageForm from "@/components/admin/PageForm";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EditPagePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) return;
      
      try {
        console.log("Fetching page with slug:", id);
        const data = await getPageBySlug(id);
        
        if (!data) {
          setError("Page not found");
          console.error("Page not found:", id);
          toast({
            title: "Error",
            description: `Page with slug "${id}" not found`,
            variant: "destructive",
          });
        } else {
          setPage(data);
          console.log("Page fetched successfully:", data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch page");
        console.error("Error fetching page:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to fetch page",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, toast]);

  // Redirect if not logged in or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-dm-gray500" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-dm-gray700 mb-4">
          {error || "This page could not be found."}
        </p>
        <p className="text-dm-gray600 text-sm">
          Please check the page slug and try again.
        </p>
      </div>
    );
  }

  return <PageForm page={page} />;
};

export default EditPagePage;
