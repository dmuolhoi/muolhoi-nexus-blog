
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Page } from "@/lib/supabase";
import { updatePage } from "@/lib/api";
import { Loader2, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownContent from "../blog/MarkdownContent";

interface PageFormProps {
  page: Page;
}

const PageForm = ({ page }: PageFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(page.content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!content) {
        throw new Error("Content is required");
      }
      
      await updatePage(page.id, { content });
      
      toast({
        title: "Page updated",
        description: "The page has been updated successfully"
      });
      
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
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
          <p className="text-sm text-dm-gray500 mb-4">Editing page content</p>
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content in markdown format..."
                rows={15}
                required
                className="font-mono text-sm"
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0 border rounded-md p-4 min-h-[300px]">
              <MarkdownContent content={content} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PageForm;
