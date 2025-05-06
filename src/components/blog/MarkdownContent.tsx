
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent = ({ content, className }: MarkdownContentProps) => {
  return (
    <div className={cn("prose prose-sm sm:prose max-w-none", className)}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
