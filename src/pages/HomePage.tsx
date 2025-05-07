
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter, FileText, BookOpen, Grid } from "lucide-react";

const HomePage = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-dm-gray800 to-dm-black mx-auto overflow-hidden border-4 border-white shadow-lg">
          <img 
            src="/placeholder.svg" 
            alt="Donal Muolhoi" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">Donal Muolhoi</h1>
          <p className="text-lg md:text-xl text-dm-gray600">
            Full-Stack Developer & Digital Consultant
          </p>
        </div>
        
        <div className="flex justify-center gap-3">
          <a 
            href="https://github.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-dm-gray100 hover:bg-dm-gray200 p-3 rounded-full transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href="https://linkedin.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-dm-gray100 hover:bg-dm-gray200 p-3 rounded-full transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a 
            href="https://twitter.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-dm-gray100 hover:bg-dm-gray200 p-3 rounded-full transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </section>
      
      {/* Bio Section */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-dm-gray50">
        <CardContent className="pt-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-dm-gray700">
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              With over 5 years of professional experience, I specialize in creating responsive, 
              accessible, and performant web applications that solve real-world problems.
            </p>
            <p className="text-dm-gray700">
              My approach combines technical excellence with a deep understanding of user needs, 
              resulting in intuitive experiences that users love. Whether working on frontend UI 
              components or backend architecture, I focus on creating sustainable solutions that 
              stand the test of time.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link to="/about">Read More About Me</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/services"
            className="bg-white border border-dm-gray200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-2"
          >
            <FileText className="h-8 w-8 mb-2 text-dm-black" />
            <h3 className="font-semibold">Services</h3>
            <p className="text-sm text-dm-gray600">
              Discover how I can help bring your digital ideas to life
            </p>
          </Link>
          
          <Link 
            to="/blog"
            className="bg-white border border-dm-gray200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-2"
          >
            <BookOpen className="h-8 w-8 mb-2 text-dm-black" />
            <h3 className="font-semibold">Blog</h3>
            <p className="text-sm text-dm-gray600">
              Read my latest thoughts and insights on technology
            </p>
          </Link>
          
          <Link 
            to="/projects"
            className="bg-white border border-dm-gray200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-2"
          >
            <Grid className="h-8 w-8 mb-2 text-dm-black" />
            <h3 className="font-semibold">Projects</h3>
            <p className="text-sm text-dm-gray600">
              Explore my portfolio of recent work and case studies
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
