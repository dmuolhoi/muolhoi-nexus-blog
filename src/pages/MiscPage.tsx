
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, Shield } from "lucide-react";

const MiscPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Resources & Information</h1>
        <p className="text-lg text-dm-gray700">
          Explore various resources, policies, and additional information.
        </p>
      </section>

      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="mt-6 space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Legal Policies</h2>
                <div className="space-y-4">
                  <Link to="/terms" className="flex items-center gap-3 p-4 rounded-lg bg-dm-subtle hover:bg-dm-primary/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-dm-primary/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-dm-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Terms of Service</h3>
                      <p className="text-sm text-dm-gray600">Learn about the terms governing the use of our services</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-dm-gray500" />
                  </Link>
                  
                  <Link to="/privacy" className="flex items-center gap-3 p-4 rounded-lg bg-dm-subtle hover:bg-dm-primary/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-dm-secondary/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-dm-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Privacy Policy</h3>
                      <p className="text-sm text-dm-gray600">Learn how we collect, use, and protect your personal information</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-dm-gray500" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6 space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Helpful Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">Resource Guide</h3>
                  <p className="text-sm text-dm-gray600 mt-2">A comprehensive guide to getting started with our services</p>
                  <a href="#" className="text-sm text-dm-primary flex items-center gap-1 mt-2 hover:underline">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">FAQ</h3>
                  <p className="text-sm text-dm-gray600 mt-2">Answers to commonly asked questions about our services</p>
                  <a href="#" className="text-sm text-dm-primary flex items-center gap-1 mt-2 hover:underline">
                    View FAQ <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">Blog Articles</h3>
                  <p className="text-sm text-dm-gray600 mt-2">Educational content and insights from our experts</p>
                  <Link to="/blog" className="text-sm text-dm-primary flex items-center gap-1 mt-2 hover:underline">
                    Read articles <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">Video Tutorials</h3>
                  <p className="text-sm text-dm-gray600 mt-2">Step-by-step video guides for using our platform</p>
                  <a href="#" className="text-sm text-dm-primary flex items-center gap-1 mt-2 hover:underline">
                    Watch videos <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads" className="mt-6 space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Downloadable Content</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg flex items-center gap-4">
                  <div className="h-14 w-14 bg-dm-primary/10 rounded flex items-center justify-center">
                    <FileText className="h-6 w-6 text-dm-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Service Brochure</h3>
                    <p className="text-sm text-dm-gray600">A detailed overview of all our services (PDF, 2.4MB)</p>
                  </div>
                  <button className="text-dm-primary hover:text-dm-primary/80">
                    Download
                  </button>
                </div>
                
                <div className="p-4 border rounded-lg flex items-center gap-4">
                  <div className="h-14 w-14 bg-dm-secondary/10 rounded flex items-center justify-center">
                    <FileText className="h-6 w-6 text-dm-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Case Studies</h3>
                    <p className="text-sm text-dm-gray600">Collection of client success stories (PDF, 3.8MB)</p>
                  </div>
                  <button className="text-dm-primary hover:text-dm-primary/80">
                    Download
                  </button>
                </div>
                
                <div className="p-4 border rounded-lg flex items-center gap-4">
                  <div className="h-14 w-14 bg-dm-accent/10 rounded flex items-center justify-center">
                    <FileText className="h-6 w-6 text-dm-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">User Manual</h3>
                    <p className="text-sm text-dm-gray600">Complete guide to using our platform (PDF, 5.1MB)</p>
                  </div>
                  <button className="text-dm-primary hover:text-dm-primary/80">
                    Download
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MiscPage;
