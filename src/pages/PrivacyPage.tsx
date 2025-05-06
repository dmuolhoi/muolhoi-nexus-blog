
import React, { useState, useEffect } from "react";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { Loader2 } from "lucide-react";

const PrivacyPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug("privacy");
        setPage(data);
      } catch (err) {
        console.error("Error fetching privacy page:", err);
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
# Privacy Policy

## Introduction

This Privacy Policy explains how DM collects, uses, and protects your information when you use our application.

## Information We Collect

We may collect the following information:
- Personal information such as name and email address
- Usage data and analytics
- Device information

## How We Use Your Information

We use the collected information to:
- Provide and maintain our service
- Improve and personalize user experience
- Analyze usage patterns and optimize our application

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Third-Party Links

Our application may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## Contact Us

If you have any questions about this Privacy Policy, please contact us.

Last updated: May 6, 2025
  `;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <MarkdownContent content={content} />
    </div>
  );
};

export default PrivacyPage;
