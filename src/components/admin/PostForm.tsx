
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createPost, updatePost, uploadImage } from "@/lib/api";
import { Post } from "@/lib/supabase";
import MarkdownContent from "../blog/MarkdownContent";

interface PostFormProps {
  post?: Post;
  onDelete?: (id: string) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [published, setPublished] = useState(post?.published || false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const handleSlugChange = (value: string) => {
    // Convert to lowercase, replace spaces with hyphens, remove special chars
    const formattedSlug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(formattedSlug);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setCoverImage(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let finalCoverImage = coverImage;
      
      // Upload image if a new one was selected
      if (imageFile) {
        try {
          const imageUrl = await uploadImage(imageFile, 'posts');
          if (imageUrl) {
            finalCoverImage = imageUrl;
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "Image Upload Failed",
            description: "Your post will be saved without the new image.",
            variant: "destructive",
          });
        }
      }

      const postData = {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        cover_image: finalCoverImage || null,
        published,
      };

      let result;
      if (post) {
        // Update existing post
        result = await updatePost(post.id, postData);
        toast({
          title: "Post Updated",
          description: "Your post has been updated successfully.",
        });
      } else {
        // Create new post
        result = await createPost(postData);
        toast({
          title: "Post Created",
          description: "Your post has been created successfully.",
        });
        
        // Redirect to edit page for the new post
        navigate(`/admin/posts/edit/${result.slug}`);
        return;
      }
      
      // Reset form state
      setIsSubmitting(false);
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast({
        title: "Error Saving Post",
        description: error.message || "There was an error saving your post.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(post.id);
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted successfully.",
      });
      navigate("/admin");
    } catch (error: any) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error Deleting Post",
        description: error.message || "There was an error deleting your post.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">
            {post ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-sm text-dm-gray500">
            {post ? "Update your existing post" : "Create a new blog post"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
          {post && onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this post? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardHeader>
            <CardTitle>{title || "Post Title"}</CardTitle>
            <p className="text-sm text-dm-gray500">Preview Mode</p>
          </CardHeader>
          <CardContent>
            {coverImage && (
              <div className="mb-6">
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full max-h-80 object-cover rounded-lg"
                />
              </div>
            )}
            <MarkdownContent content={content} />
          </CardContent>
          <CardFooter>
            <Button onClick={() => setPreviewMode(false)}>Back to Edit Mode</Button>
          </CardFooter>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post Title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="post-slug"
                  required
                />
                <p className="text-xs text-dm-gray500">
                  URL-friendly version of the title. Used in the post URL.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover">Cover Image</Label>
                <div className="space-y-2">
                  {coverImage && (
                    <div className="mb-2">
                      <img
                        src={coverImage}
                        alt="Cover Preview"
                        className="w-full max-h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  rows={15}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Publish Post</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : post ? (
                  "Update Post"
                ) : (
                  "Create Post"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
};

export default PostForm;
