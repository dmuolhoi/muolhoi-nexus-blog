
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import PageForm from "@/components/admin/PageForm";
import { Loader2 } from "lucide-react";

const EditPagePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) return;
      
      try {
        const data = await getPageBySlug(id);
        
        if (!data) {
          setError("Page not found");
          console.error("Page not found:", id);
        } else {
          setPage(data);
          console.log("Page fetched successfully:", data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch page");
        console.error("Error fetching page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

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
      <div className="text-center py-10">
        <p className="text-dm-gray700 mb-4">
          {error || "This page could not be found."}
        </p>
      </div>
    );
  }

  return <PageForm page={page} />;
};

export default EditPagePage;
