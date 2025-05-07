
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { Page } from "@/lib/supabase";
import { updatePage } from "@/lib/api";
import MarkdownContent from "../blog/MarkdownContent";

interface PageFormProps {
  page: Page;
}

const PageForm: React.FC<PageFormProps> = ({ page }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [content, setContent] = useState(page.content || "");
  
  // Helper for image upload markdown syntax
  const insertImageMarkdown = () => {
    const imageMarkdown = "![Image description](https://example.com/your-image.jpg)";
    setContent(prevContent => prevContent + "\n\n" + imageMarkdown);
    
    toast({
      title: "Image Markdown Added",
      description: "Replace the URL with your actual image URL",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updatePage(page.id, { content });
      
      toast({
        title: "Page Updated",
        description: `${page.title} page has been updated successfully.`,
      });
      
      setIsSubmitting(false);
    } catch (error: any) {
      console.error("Error updating page:", error);
      toast({
        title: "Error Updating Page",
        description: error.message || "There was an error updating the page.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Edit {page.title} Page</h1>
          <p className="text-sm text-dm-gray500">
            Update the content of this static page
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={insertImageMarkdown}
            title="Insert Image Markdown"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Insert Image
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardHeader>
            <CardTitle>{page.title}</CardTitle>
            <p className="text-sm text-dm-gray500">Preview Mode</p>
          </CardHeader>
          <CardContent>
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
              <CardTitle>{page.title} Content</CardTitle>
              <p className="text-sm text-dm-gray500">
                Use Markdown for formatting. To add images, use: ![Alt text](image-url.jpg)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your page content here..."
                  rows={20}
                  required
                  className="font-mono"
                />
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
                ) : (
                  "Update Page"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
};

export default PageForm;
