
import React, { useState, useEffect } from "react";
import { getPageBySlug } from "@/lib/api";
import { Page } from "@/lib/supabase";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { Loader2 } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQPage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageBySlug("faq");
        setPage(data);
      } catch (err) {
        console.error("Error fetching FAQ page:", err);
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
# Frequently Asked Questions

## General Questions

### What services do you offer?
I provide a range of professional services including web development, design, and consulting. Check out my Services page for more details.

### How can I contact you?
You can reach me through the contact form on this website or by emailing directly. I aim to respond to all inquiries within 24 hours.

### Do you work with clients internationally?
Yes, I work with clients globally and have experience collaborating with teams across different time zones.

## Project-Related Questions

### How long does a typical project take?
Project timelines vary depending on scope and complexity. A simple website might take 2-3 weeks, while more complex applications could take several months.

### What is your pricing structure?
I offer flexible pricing options including fixed project rates and hourly billing. Each project is quoted individually based on requirements and scope.

### Do you provide ongoing support after project completion?
Yes, I offer maintenance packages and ongoing support to ensure your project continues to function optimally after launch.
  `;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      {page ? (
        <MarkdownContent content={content} />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What services do you offer?</AccordionTrigger>
            <AccordionContent>
              I provide a range of professional services including web development, design, and consulting. Check out my Services page for more details.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>How can I contact you?</AccordionTrigger>
            <AccordionContent>
              You can reach me through the contact form on this website or by emailing directly. I aim to respond to all inquiries within 24 hours.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you work with clients internationally?</AccordionTrigger>
            <AccordionContent>
              Yes, I work with clients globally and have experience collaborating with teams across different time zones.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
            <AccordionContent>
              Project timelines vary depending on scope and complexity. A simple website might take 2-3 weeks, while more complex applications could take several months.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>What is your pricing structure?</AccordionTrigger>
            <AccordionContent>
              I offer flexible pricing options including fixed project rates and hourly billing. Each project is quoted individually based on requirements and scope.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger>Do you provide ongoing support after project completion?</AccordionTrigger>
            <AccordionContent>
              Yes, I offer maintenance packages and ongoing support to ensure your project continues to function optimally after launch.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default FAQPage;
