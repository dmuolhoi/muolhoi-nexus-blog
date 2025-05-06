
import React, { useState, useEffect } from "react";
import { getPublishedPosts } from "@/lib/api";
import { Post } from "@/lib/supabase";
import PostCard from "@/components/blog/PostCard";
import { Loader2 } from "lucide-react";

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPublishedPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch blog posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-dm-gray500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-dm-gray700 mb-4">Failed to load blog posts.</p>
        <p className="text-sm text-dm-gray500">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Blog</h2>
        <p className="text-dm-gray700">No blog posts yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
