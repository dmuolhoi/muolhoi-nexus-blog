
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-10 py-4 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Donal Muolhoi</h1>
        <p className="text-lg text-dm-gray700">
          Welcome to my personal blog and website. Here, I share my thoughts, work, and services.
        </p>
        <div className="flex gap-4 pt-2">
          <Button asChild className="rounded-full">
            <Link to="/blog">
              Read Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/services">View Services</Link>
          </Button>
          {!user && (
            <Button asChild variant="outline" size="sm" className="ml-auto">
              <Link to="/login">
                <Lock className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-dm-gray200 pb-2">About Me</h2>
        <p className="text-dm-gray700">
          I'm Donal Muolhoi, a professional with expertise in various domains. Through this platform, I share insights on topics I'm passionate about and offer specialized services to clients worldwide.
        </p>
        <p className="text-dm-gray700">
          With years of experience in the industry, I've developed a unique perspective that informs my work and writing. My goal is to provide value through both my blog content and professional services.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-dm-gray200 pb-2">Featured Services</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-dm-gray200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Service 1</h3>
            <p className="text-sm text-dm-gray600 mb-4">
              Description of service 1 and what clients can expect when working with me.
            </p>
            <Link to="/services" className="text-sm font-medium hover:underline">
              Learn more →
            </Link>
          </div>
          <div className="border border-dm-gray200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Service 2</h3>
            <p className="text-sm text-dm-gray600 mb-4">
              Description of service 2 and what clients can expect when working with me.
            </p>
            <Link to="/services" className="text-sm font-medium hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
        <div className="text-center pt-4">
          <Button asChild variant="outline">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-dm-gray200 pb-2">Latest Articles</h2>
        <div className="space-y-4">
          <div className="border border-dm-gray200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <h3 className="text-lg font-semibold mb-1">Sample Blog Post Title</h3>
            <p className="text-sm text-dm-gray500 mb-2">May 5, 2025</p>
            <p className="text-sm text-dm-gray600">
              This is a brief excerpt from the blog post that gives readers an idea of what the article is about...
            </p>
          </div>
          <div className="border border-dm-gray200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <h3 className="text-lg font-semibold mb-1">Another Interesting Post</h3>
            <p className="text-sm text-dm-gray500 mb-2">May 1, 2025</p>
            <p className="text-sm text-dm-gray600">
              This is a brief excerpt from another blog post to showcase variety in content...
            </p>
          </div>
        </div>
        <div className="text-center pt-4">
          <Button asChild>
            <Link to="/blog">View All Posts</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
