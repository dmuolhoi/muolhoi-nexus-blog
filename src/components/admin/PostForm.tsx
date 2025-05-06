
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Post } from "@/lib/supabase";
import { createPost, updatePost, uploadImage } from "@/lib/api";
import { Loader2, Save, Trash, UploadCloud } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownContent from "../blog/MarkdownContent";

interface PostFormProps {
  post?: Post;
  onDelete?: (id: string) => Promise<void>;
}

const PostForm = ({ post, onDelete }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Post>>(
    post || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      published: false,
      cover_image: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    
    try {
      setUploading(true);
      const imageUrl = await uploadImage(file, "posts");
      
      if (imageUrl) {
        setFormData((prev) => ({
          ...prev,
          cover_image: imageUrl
        }));
        
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully"
        });
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.title || !formData.content) {
        throw new Error("Title and content are required");
      }
      
      // Generate slug from title if not provided
      if (!formData.slug) {
        formData.slug = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }
      
      let result;
      
      if (post?.id) {
        result = await updatePost(post.id, formData);
        toast({
          title: "Post updated",
          description: "Your post has been updated successfully"
        });
      } else {
        result = await createPost(formData as Omit<Post, "id" | "created_at" | "updated_at">);
        toast({
          title: "Post created",
          description: "Your post has been created successfully"
        });
      }
      
      navigate("/admin");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeletePost = async () => {
    if (!post?.id || !onDelete) return;
    
    try {
      await onDelete(post.id);
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully"
      });
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Error deleting post",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Post title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug || ""}
            onChange={handleChange}
            placeholder="post-url-slug (leave empty to generate from title)"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt || ""}
            onChange={handleChange}
            placeholder="Brief description of the post"
            rows={2}
          />
        </div>
        
        <div>
          <Label className="block mb-2">Cover Image</Label>
          {formData.cover_image && (
            <div className="mb-4">
              <img
                src={formData.cover_image}
                alt="Cover preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("cover_image")?.click()}
              disabled={uploading}
              className="flex items-center"
            >
              {uploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UploadCloud className="mr-2 h-4 w-4" />
              )}
              {formData.cover_image ? "Change Image" : "Upload Image"}
            </Button>
            {formData.cover_image && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData((prev) => ({ ...prev, cover_image: "" }))}
              >
                Remove Image
              </Button>
            )}
            <input
              type="file"
              id="cover_image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Content (Markdown with HTML support)</Label>
          <Tabs defaultValue="edit">
            <TabsList className="mb-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="mt-0">
              <Textarea
                id="content"
                name="content"
                value={formData.content || ""}
                onChange={handleChange}
                placeholder="Write your content in markdown format..."
                rows={12}
                required
                className="font-mono text-sm"
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0 border rounded-md p-4 min-h-[300px]">
              <MarkdownContent content={formData.content || ""} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch
            checked={formData.published || false}
            onCheckedChange={handleSwitchChange}
            id="published"
          />
          <Label htmlFor="published">Published</Label>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isSubmitting} className="flex items-center">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
            Cancel
          </Button>
        </div>
        
        {post?.id && onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="button">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePost}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  );
};

export default PostForm;
