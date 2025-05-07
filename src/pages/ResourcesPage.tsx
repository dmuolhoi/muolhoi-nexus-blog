
import React, { useState, useEffect } from "react";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { Loader2, Link as LinkIcon, FileText, Book, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug("resources");
        setPage(data);
      } catch (err) {
        console.error("Error fetching resources page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-dm-gray500" />
      </div>
    );
  }

  // Use dummy content if no page data is available
  const content = page?.content || `
# Resources

## Useful Resources & Downloads

### Guides
- [Beginner's Guide to Web Development](/downloads/beginners-guide.pdf)
- [Understanding UX Design Principles](/downloads/ux-design-principles.pdf)
- [Advanced CSS Techniques](/downloads/advanced-css.pdf)

### Templates
- [Portfolio Website Template](/downloads/portfolio-template.zip)
- [Business Card Design Template](/downloads/business-card-template.zip)
- [Social Media Graphics Pack](/downloads/social-media-pack.zip)

### Tools
- [Color Palette Generator](https://coolors.co/)
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Web Accessibility Evaluation Tool](https://wave.webaim.org/)
  `;

  const resources = [
    {
      title: "Guides & Documentation",
      description: "Educational resources and reference materials",
      items: [
        { name: "Beginner's Guide", icon: <Book className="h-5 w-5" />, link: "#" },
        { name: "Design Principles", icon: <FileText className="h-5 w-5" />, link: "#" },
        { name: "Technical Documentation", icon: <FileText className="h-5 w-5" />, link: "#" },
      ]
    },
    {
      title: "Templates & Downloads",
      description: "Ready-to-use files and templates",
      items: [
        { name: "Project Templates", icon: <Download className="h-5 w-5" />, link: "#" },
        { name: "Design Assets", icon: <Download className="h-5 w-5" />, link: "#" },
        { name: "Code Snippets", icon: <Download className="h-5 w-5" />, link: "#" },
      ]
    },
    {
      title: "External Resources",
      description: "Useful links and third-party tools",
      items: [
        { name: "Color Palette Generator", icon: <LinkIcon className="h-5 w-5" />, link: "https://coolors.co/" },
        { name: "Responsive Design Checker", icon: <LinkIcon className="h-5 w-5" />, link: "https://responsivedesignchecker.com/" },
        { name: "Web Accessibility Evaluation", icon: <LinkIcon className="h-5 w-5" />, link: "https://wave.webaim.org/" },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Resources</h1>
      <p className="text-dm-gray600 mb-8">A collection of useful resources, tools, and downloads</p>
      
      {page ? (
        <MarkdownContent content={content} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((category, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Button variant="ghost" asChild className="w-full justify-start">
                        <Link to={item.link} className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
