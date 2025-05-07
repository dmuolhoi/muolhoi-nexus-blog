
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">About Me</h1>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-dm-primary/20 to-dm-secondary/20 p-6 shadow-card">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Profile" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Donal Muolhoi</h2>
              <p className="text-lg text-dm-gray700">
                Professional with expertise in multiple domains, passionate about sharing insights and providing specialized services to clients worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-dm-primary/10 text-dm-primary rounded-full text-sm font-medium">Web Development</span>
                <span className="px-3 py-1 bg-dm-secondary/10 text-dm-secondary rounded-full text-sm font-medium">Content Creation</span>
                <span className="px-3 py-1 bg-dm-accent/10 text-dm-accent rounded-full text-sm font-medium">Consulting</span>
                <span className="px-3 py-1 bg-dm-blue/10 text-dm-blue rounded-full text-sm font-medium">Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Background & Experience</h2>
        <Card className="overflow-hidden shadow-card">
          <CardContent className="p-6">
            <p className="leading-relaxed text-dm-gray700">
              With over a decade of experience in the industry, I've developed a unique perspective that informs my work and writing. I've worked with clients ranging from startups to Fortune 500 companies, helping them achieve their goals through strategic consulting and implementation.
            </p>
            <p className="leading-relaxed text-dm-gray700 mt-4">
              My background in multiple disciplines allows me to approach problems from different angles, finding innovative solutions that others might miss. I believe in continuous learning and staying updated with the latest trends and technologies in my field.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-dm-primary/20 flex items-center justify-center mr-2">
                  <span className="text-dm-primary">1</span>
                </span>
                Technical Skills
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-dm-gray700">
                <li>Full-stack web development</li>
                <li>Mobile application development</li>
                <li>Database design and management</li>
                <li>Cloud infrastructure</li>
                <li>Performance optimization</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="shadow-card card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="w-8 h-8 rounded-full bg-dm-secondary/20 flex items-center justify-center mr-2">
                  <span className="text-dm-secondary">2</span>
                </span>
                Soft Skills
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-dm-gray700">
                <li>Project management</li>
                <li>Client communication</li>
                <li>Team leadership</li>
                <li>Problem-solving</li>
                <li>Strategic planning</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Education & Certifications</h2>
        <Card className="shadow-card">
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Master's Degree in Computer Science</h3>
              <p className="text-dm-gray600">University of Technology, 2015-2017</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Bachelor's Degree in Information Systems</h3>
              <p className="text-dm-gray600">State University, 2011-2015</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Certifications</h3>
              <ul className="list-disc pl-6 space-y-2 text-dm-gray700">
                <li>AWS Certified Solutions Architect</li>
                <li>Google Cloud Professional Developer</li>
                <li>Certified Scrum Master</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Connect With Me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="flex items-center gap-2 bg-[#1DA1F2]/10 text-[#1DA1F2] p-4 rounded-lg hover:bg-[#1DA1F2]/20 transition-colors">
            <span>Twitter</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="flex items-center gap-2 bg-[#0077B5]/10 text-[#0077B5] p-4 rounded-lg hover:bg-[#0077B5]/20 transition-colors">
            <span>LinkedIn</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="flex items-center gap-2 bg-[#333]/10 text-[#333] p-4 rounded-lg hover:bg-[#333]/20 transition-colors">
            <span>GitHub</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          <a href="#" className="flex items-center gap-2 bg-[#EA4335]/10 text-[#EA4335] p-4 rounded-lg hover:bg-[#EA4335]/20 transition-colors">
            <span>Email</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
