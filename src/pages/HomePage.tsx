
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="space-y-12 py-4 animate-fade-in">
      <section className="pt-4 pb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-6 text-left">
            <h1 className="text-5xl sm:text-6xl font-bold gradient-text">Donal Muolhoi</h1>
            <p className="text-xl text-dm-gray700 max-w-xl">
              Professional Web Developer & Digital Consultant
            </p>
            <div className="flex space-x-4 pt-2">
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="/placeholder.svg"
              alt="Profile" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="relative rounded-2xl overflow-hidden gradient-bg p-8 shadow-card">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">About Me</h2>
            <p className="text-dm-gray700">
              I'm Donal Muolhoi, a professional web developer and digital consultant with over 10 years of experience. I specialize in creating modern, responsive, and user-friendly web applications for businesses and individuals.
            </p>
            <p className="text-dm-gray700">
              My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed client expectations.
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link to="/about" className="flex items-center gap-1">
                Learn more about me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden shadow-card card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-dm-gray100 flex items-center justify-center mb-4">
                <span className="text-dm-primary text-xl font-bold">S</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Services</h3>
              <p className="text-sm text-dm-gray600 mb-4">
                Professional services tailored to meet your specific needs and help you achieve your goals.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/services" className="text-sm font-medium flex items-center">
                  View Services
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-card card-hover">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-dm-gray100 flex items-center justify-center mb-4">
                <span className="text-dm-primary text-xl font-bold">B</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Blog</h3>
              <p className="text-sm text-dm-gray600 mb-4">
                Read my latest articles and insights on web development, design, and digital strategy.
              </p>
              <Button asChild variant="link" className="p-0">
                <Link to="/blog" className="text-sm font-medium flex items-center">
                  Read Blog
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Legal & Resources</h2>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" size="sm">
                <Link to="/legal">Resources & Documentation</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/terms">Terms of Service</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
