
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllPosts, getAllPages } from "@/lib/api";
import { Post, Page } from "@/lib/supabase";
import PostCard from "@/components/blog/PostCard";
import { Plus, Loader2, FileText, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, pagesData] = await Promise.all([
          getAllPosts(),
          getAllPages(),
        ]);
        
        setPosts(postsData);
        setPages(pagesData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="pages">Static Pages</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4">
          {posts.length === 0 ? (
            <div className="text-center py-8 border rounded-md">
              <p className="text-dm-gray600 mb-4">No blog posts yet.</p>
              <Button asChild variant="outline">
                <Link to="/admin/posts/new">Create Your First Post</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} isAdmin={true} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="pages" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={`/admin/pages/edit/${page.id}`}
                className="border border-dm-gray200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{page.title}</h3>
                    <p className="text-sm text-dm-gray500">/{page.slug}</p>
                  </div>
                  <div className="text-dm-gray500">
                    <FileText className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
