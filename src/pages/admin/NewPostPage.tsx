
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PostForm from "@/components/admin/PostForm";

const NewPostPage = () => {
  const { user, isAdmin } = useAuth();

  // Redirect if not logged in or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <PostForm />;
};

export default NewPostPage;
