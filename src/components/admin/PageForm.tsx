import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Image as ImageIcon, Save, Eye, Code, ArrowLeft } from "lucide-react";
import { Page } from "@/lib/supabase";
import { updatePage, uploadImage } from "@/lib/api";
import MarkdownContent from "../blog/MarkdownContent";

interface PageFormProps {
  page: Page;
}

const PageForm: React.FC<PageFormProps> = ({ page }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [content, setContent] = useState(page.content || "");
  
  // Helper for image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadingImage(true);
    
    try {
      const imageUrl = await uploadImage(file, `pages/${page.slug}`);
      
      if (imageUrl) {
        const imageMarkdown = `![${file.name}](${imageUrl})`;
        
        // Insert at cursor position if possible, otherwise append
        const textarea = document.getElementById('content') as HTMLTextAreaElement;
        if (textarea.selectionStart || textarea.selectionStart === 0) {
          const startPos = textarea.selectionStart;
          const endPos = textarea.selectionEnd;
          const newContent = 
            content.substring(0, startPos) + 
            imageMarkdown + 
            content.substring(endPos, content.length);
          
          setContent(newContent);
          
          // Reset cursor position after state update
          setTimeout(() => {
            textarea.selectionStart = startPos + imageMarkdown.length;
            textarea.selectionEnd = startPos + imageMarkdown.length;
            textarea.focus();
          }, 0);
        } else {
          // If no cursor position, append to end
          setContent(prevContent => prevContent + "\n\n" + imageMarkdown);
        }
        
        toast({
          title: "Image Uploaded",
          description: "Image has been uploaded and inserted into the content.",
        });
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Could not upload image",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the input
      }
    }
  };
  
  // Helper for markdown syntax insertion
  const insertMarkdown = (syntax: string, placeholder: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    
    if (textarea.selectionStart || textarea.selectionStart === 0) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const selectedText = content.substring(startPos, endPos);
      
      let insertion = '';
      if (selectedText) {
        // If text is selected, wrap it with the syntax
        insertion = syntax.replace(placeholder, selectedText);
      } else {
        // Otherwise just insert the syntax with placeholder
        insertion = syntax;
      }
      
      const newContent = 
        content.substring(0, startPos) + 
        insertion + 
        content.substring(endPos, content.length);
      
      setContent(newContent);
      
      // Reset cursor position after state update
      setTimeout(() => {
        const newCursorPos = startPos + insertion.length;
        textarea.selectionStart = newCursorPos;
        textarea.selectionEnd = newCursorPos;
        textarea.focus();
      }, 0);
    } else {
      // If no cursor position, append to end
      setContent(prevContent => prevContent + "\n\n" + syntax);
    }
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
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? (
              <>
                <Code className="h-4 w-4 mr-2" />
                Edit Mode
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview Mode
              </>
            )}
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
                Use Markdown for formatting.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => insertMarkdown("# Heading", "Heading")}
                >
                  H1
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => insertMarkdown("## Subheading", "Subheading")}
                >
                  H2
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => insertMarkdown("**Bold text**", "Bold text")}
                >
                  Bold
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => insertMarkdown("*Italic text*", "Italic text")}
                >
                  Italic
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => insertMarkdown("[Link text](https://example.com)", "Link text")}
                >
                  Link
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden"
                />
              </div>
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
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
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
