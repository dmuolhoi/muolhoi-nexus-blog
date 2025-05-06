
import React, { useState, useEffect } from "react";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { Loader2 } from "lucide-react";

const TermsPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug("terms");
        setPage(data);
      } catch (err) {
        console.error("Error fetching terms page:", err);
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
# Terms of Use

## Introduction

Welcome to DM. By accessing and using this application, you agree to comply with and be bound by the following terms and conditions.

## Intellectual Property

All content published on this application, including but not limited to text, graphics, logos, images, and software, is the property of Donal Muolhoi and is protected by copyright laws.

## User Conduct

Users must not:
- Use the application for any unlawful purpose
- Attempt to gain unauthorized access to any part of the application
- Engage in any activity that disrupts the functionality of the application

## Disclaimer

The information provided on this application is for general informational purposes only. We make no representations or warranties about the accuracy or completeness of the information.

## Changes to Terms

We reserve the right to modify these terms at any time. Your continued use of the application after any changes indicates your acceptance of the modified terms.

## Contact Information

If you have any questions about these terms, please contact us.

Last updated: May 6, 2025
  `;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <MarkdownContent content={content} />
    </div>
  );
};

export default TermsPage;
