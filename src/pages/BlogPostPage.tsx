
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/api";
import { Post } from "@/lib/supabase";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
        
        if (!data) {
          setError("Post not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch blog post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
        <Button asChild variant="outline">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Button asChild variant="ghost" className="mb-4 -ml-2">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      
      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
        <p className="text-dm-gray500">{formatDate(post.created_at)}</p>
      </header>
      
      {post.cover_image && (
        <div className="my-6">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full rounded-lg"
          />
        </div>
      )}
      
      <MarkdownContent content={post.content} className="pt-4" />
    </article>
  );
};

export default BlogPostPage;
