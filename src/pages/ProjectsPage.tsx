
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Project One",
    description: "A comprehensive web application built with React and Node.js that helps businesses manage their inventory and sales.",
    image: "/placeholder.svg",
    tags: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#"
  },
  {
    title: "Project Two",
    description: "A mobile application developed with React Native that provides users with personalized fitness routines and nutrition plans.",
    image: "/placeholder.svg",
    tags: ["React Native", "Firebase", "Redux"],
    github: "#",
    demo: "#"
  },
  {
    title: "Project Three",
    description: "An e-commerce platform built with Vue.js and Laravel that features a custom CMS for easy content management.",
    image: "/placeholder.svg",
    tags: ["Vue.js", "Laravel", "MySQL"],
    github: "#",
    demo: "#"
  },
  {
    title: "Project Four",
    description: "A data visualization dashboard that helps companies analyze and interpret their performance metrics using real-time data.",
    image: "/placeholder.svg",
    tags: ["D3.js", "Angular", "Express"],
    github: "#",
    demo: "#"
  }
];

const ProjectsPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">My Projects</h1>
        <p className="text-lg text-dm-gray700">
          Explore some of the projects I've worked on. Each project represents a unique challenge and solution.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden shadow-card card-hover">
            <div className="h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-5">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-dm-gray700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-dm-subtle text-dm-gray700 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-5 pt-0 border-t border-dm-gray200">
              <Button variant="outline" size="sm" asChild>
                <a href={project.github} className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href={project.demo} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default ProjectsPage;
