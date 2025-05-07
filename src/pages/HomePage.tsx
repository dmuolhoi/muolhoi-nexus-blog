
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-12 py-4 animate-fade-in">
      <section className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Donal Muolhoi</h1>
          <p className="text-lg text-dm-gray700 max-w-2xl">
            Welcome to my personal blog and website. Here, I share my thoughts, work, and services with the world.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button asChild className="rounded-full group">
            <Link to="/blog">
              Read Blog
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/services">View Services</Link>
          </Button>
        </div>
      </section>

      <section className="py-6">
        <div className="relative rounded-2xl overflow-hidden gradient-bg p-8 shadow-card">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">About Me</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/placeholder.svg"
                  alt="Profile" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                <p className="text-dm-gray700">
                  I'm Donal Muolhoi, a professional with expertise in various domains. Through this platform, I share insights on topics I'm passionate about and offer specialized services to clients worldwide.
                </p>
                <p className="text-dm-gray700">
                  With years of experience in the industry, I've developed a unique perspective that informs my work and writing.
                </p>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link to="/about" className="flex items-center gap-1">
                    Learn more about me
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Services</h2>
          <Link to="/services" className="text-dm-primary hover:underline text-sm font-medium flex items-center">
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden shadow-card card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-dm-primary/10 flex items-center justify-center mb-4">
                <span className="text-dm-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Service 1</h3>
              <p className="text-sm text-dm-gray600 mb-4">
                Description of service 1 and what clients can expect when working with me. This service is designed to help you achieve specific goals.
              </p>
              <Link to="/services" className="text-sm font-medium text-dm-primary hover:underline flex items-center">
                Learn more 
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-card card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-dm-secondary/10 flex items-center justify-center mb-4">
                <span className="text-dm-secondary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Service 2</h3>
              <p className="text-sm text-dm-gray600 mb-4">
                Description of service 2 and what clients can expect when working with me. This service is tailored to meet your specific needs.
              </p>
              <Link to="/services" className="text-sm font-medium text-dm-primary hover:underline flex items-center">
                Learn more 
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <Link to="/blog" className="text-dm-primary hover:underline text-sm font-medium flex items-center">
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-4">
          <Card className="overflow-hidden shadow-card card-hover">
            <CardContent className="p-6">
              <span className="text-xs text-dm-gray500 font-medium bg-dm-gray100 px-2 py-1 rounded-full">May 5, 2025</span>
              <h3 className="text-lg font-semibold mt-3 mb-2">Sample Blog Post Title</h3>
              <p className="text-sm text-dm-gray600 line-clamp-3">
                This is a brief excerpt from the blog post that gives readers an idea of what the article is about. It introduces the main topic and encourages them to read more to learn about the details and insights shared in the full post.
              </p>
              <Link to="/blog" className="text-sm font-medium text-dm-primary hover:underline flex items-center mt-4">
                Read post
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-card card-hover">
            <CardContent className="p-6">
              <span className="text-xs text-dm-gray500 font-medium bg-dm-gray100 px-2 py-1 rounded-full">May 1, 2025</span>
              <h3 className="text-lg font-semibold mt-3 mb-2">Another Interesting Post</h3>
              <p className="text-sm text-dm-gray600 line-clamp-3">
                This is a brief excerpt from another blog post to showcase variety in content. This article covers different topics that might be of interest to the readers, providing valuable information and insights from my perspective and experience.
              </p>
              <Link to="/blog" className="text-sm font-medium text-dm-primary hover:underline flex items-center mt-4">
                Read post
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
