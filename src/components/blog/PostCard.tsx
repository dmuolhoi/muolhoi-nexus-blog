
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Post } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
}

const PostCard = ({ post, isAdmin = false }: PostCardProps) => {
  return (
    <Link to={isAdmin ? `/admin/posts/edit/${post.id}` : `/blog/${post.slug}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md hover:border-dm-gray300">
        {post.cover_image && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
          <p className="text-sm text-dm-gray500">
            {formatDate(post.created_at)}
            {!post.published && isAdmin && (
              <span className="ml-2 px-2 py-1 text-xs rounded bg-dm-gray200">Draft</span>
            )}
          </p>
        </CardHeader>
        {post.excerpt && (
          <CardContent className="p-4 pt-0">
            <p className="text-dm-gray700 line-clamp-3">{post.excerpt}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};

export default PostCard;
