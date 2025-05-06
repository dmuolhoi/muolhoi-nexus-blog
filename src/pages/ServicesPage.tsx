
import React, { useState, useEffect } from "react";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { Loader2 } from "lucide-react";

const ServicesPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug("services");
        setPage(data);
      } catch (err) {
        console.error("Error fetching services page:", err);
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
# Services

## Professional Services I Offer

### Service 1
Description of service 1 and what clients can expect when working with me. This includes details about the process, deliverables, and expected outcomes.

### Service 2
Description of service 2 and what clients can expect when working with me. This includes details about the process, deliverables, and expected outcomes.

### Service 3
Description of service 3 and what clients can expect when working with me. This includes details about the process, deliverables, and expected outcomes.

## How to Work With Me

If you're interested in working together, please reach out via email to discuss your project needs and how I can help.
  `;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <MarkdownContent content={content} />
    </div>
  );
};

export default ServicesPage;
