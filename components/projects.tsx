"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StackingCards } from "@/components/ui/stacking-cards";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const projects = [
    {
      title: "AI Powered Financial App",
      description:
        "A financial application that uses AI to predict market trends and provide investment recommendations.",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Travel Agency App",
      description:
        "A comprehensive travel booking platform with real-time availability and personalized recommendations.",
      technologies: ["Next.js", "Express", "PostgreSQL", "Stripe"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "AI Powered Real Estate",
      description:
        "A real estate platform that uses AI to predict property values and match buyers with ideal properties.",
      technologies: ["React", "Python", "Django", "PostgreSQL"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Newsroom Management",
      description:
        "A newspaper management dashboard application for content creation, editing, and publishing.",
      technologies: [
        "Next.js",
        "Material UI",
        "Redux",
        "Sun Editor",
        "Calendar",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        PROJECTS
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StackingCards projects={projects} />
      </motion.div>

      <div className="mt-20 bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="font-mono text-sm text-[#00ffaa]">
            <p>
              const <span className="text-[#ff00aa]">project</span> = {"{"}
            </p>
            <p className="ml-4">
              name: <span className="text-white">'Newsroom Management'</span>,
            </p>
            <p className="ml-4">
              tools: [
              <span className="text-white">
                'NextJS', 'Material UI', 'Redux', 'Sun Editor', 'Calendar'
              </span>
              ],
            </p>
            <p className="ml-4">
              myRole: <span className="text-white">'Full Stack Developer'</span>
              ,
            </p>
            <p className="ml-4">
              description:{" "}
              <span className="text-white">
                'My team and I developed a newspaper management dashboard
                application called Newsroom Management. As a front-end
                developer, I worked on creating the dashboard using NextJS,
                Material UI, Redux, Calendar, and other necessary npm libraries.
                We used React Redux to manage the application's state and
                React-hook-form and Sun Editor to handle forms.'
              </span>
            </p>
            <p>{"};"}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
