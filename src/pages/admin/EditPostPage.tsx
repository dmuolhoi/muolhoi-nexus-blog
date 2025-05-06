
import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getPostBySlug, deletePost } from "@/lib/api";
import { Post } from "@/lib/supabase";
import PostForm from "@/components/admin/PostForm";
import { Loader2 } from "lucide-react";

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        // In a real app, you'd fetch by ID, but we're using slug for simplicity
        const data = await getPostBySlug(id);
        
        if (!data) {
          setError("Post not found");
        } else {
          setPost(data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
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

  if (error || !post) {
    return (
      <div className="text-center py-10">
        <p className="text-dm-gray700 mb-4">
          {error || "This post could not be found."}
        </p>
      </div>
    );
  }

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
  };

  return <PostForm post={post} onDelete={handleDeletePost} />;
};

export default EditPostPage;
