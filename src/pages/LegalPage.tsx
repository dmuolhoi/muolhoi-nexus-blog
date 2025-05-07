
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegalPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Legal & Resources</h1>
        <p className="text-lg text-dm-gray700">
          Explore our policies, resources, and additional information.
        </p>
      </section>

      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="policies">Legal Policies</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="mt-6 space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Legal Policies</h2>
                <div className="space-y-4">
                  <Link to="/terms" className="flex items-center gap-3 p-4 rounded-lg bg-dm-subtle hover:bg-dm-gray100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-dm-gray200 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-dm-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Terms of Service</h3>
                      <p className="text-sm text-dm-gray600">Learn about the terms governing the use of our services</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-dm-gray500" />
                  </Link>
                  
                  <Link to="/privacy" className="flex items-center gap-3 p-4 rounded-lg bg-dm-subtle hover:bg-dm-gray100 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-dm-gray200 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-dm-black" />
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
                  <Button variant="link" asChild>
                    <a href="#" className="text-sm flex items-center gap-1 mt-2 hover:underline">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">FAQ</h3>
                  <p className="text-sm text-dm-gray600 mt-2">Answers to commonly asked questions about our services</p>
                  <Button variant="link" asChild>
                    <a href="#" className="text-sm flex items-center gap-1 mt-2 hover:underline">
                      View FAQ <ArrowRight className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">Blog Articles</h3>
                  <p className="text-sm text-dm-gray600 mt-2">Educational content and insights from our experts</p>
                  <Button variant="link" asChild>
                    <Link to="/blog" className="text-sm flex items-center gap-1 mt-2 hover:underline">
                      Read articles <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg hover:bg-dm-subtle transition-colors">
                  <h3 className="font-semibold">Services</h3>
                  <p className="text-sm text-dm-gray600 mt-2">Learn about the services we offer</p>
                  <Button variant="link" asChild>
                    <Link to="/services" className="text-sm flex items-center gap-1 mt-2 hover:underline">
                      View services <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalPage;
