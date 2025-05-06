
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isAdmin = false }) => {
  return (
    <div className="group border border-dm-gray200 rounded-lg overflow-hidden hover:shadow-md transition-all">
      {post.cover_image && (
        <Link to={`/blog/${post.slug}`}>
          <img 
            src={post.cover_image} 
            alt={post.title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
        </Link>
      )}
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">
            <Link to={`/blog/${post.slug}`} className="hover:text-primary">
              {post.title}
            </Link>
          </h3>
          
          {isAdmin && (
            <div className="flex items-center">
              {!post.published && (
                <Badge variant="outline" className="mr-2 bg-yellow-50 text-yellow-800 border-yellow-200">
                  Draft
                </Badge>
              )}
              <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
                <Link to={`/admin/posts/edit/${post.slug}`}>
                  <Edit2 className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-sm text-dm-gray500">{formatDate(post.created_at)}</p>
        
        {post.excerpt && (
          <p className="text-sm text-dm-gray600 line-clamp-3">{post.excerpt}</p>
        )}
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-block text-sm font-medium hover:underline mt-2"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
