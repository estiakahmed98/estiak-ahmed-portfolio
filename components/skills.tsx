"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  // Enable client-side features only after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Skills Data
  const skills = [
    { name: "HTML", level: "Expert" },
    { name: "CSS", level: "Expert" },
    { name: "BootStrap", level: "Expert" },
    { name: "Figma", level: "Expert" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "MySQL", level: "Advanced" },
    { name: "MongoDB", level: "Advanced" },
    { name: "PostgreSQL", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "Next.js", level: "Intermediate" },
    { name: "React", level: "Intermediate" },
    { name: "WordPress", level: "Intermediate" },
    { name: "AI prompt Engineering", level: "Expert" },
    { name: "Data Stucture & Algorithom", level: "Beginner" },
  ];

  // Skill Icons with optimized animation
  const skillIcons = [
    { name: "HTML", icon: "/icon/html.png" },
    { name: "CSS", icon: "/icon/text.png" },
    { name: "BootStrap", icon: "/icon/bootstrap.png" },
    { name: "Python", icon: "/icon/python.png" },
    { name: "Figma", icon: "/icon/figma-icon.png" },
    { name: "TypeScript", icon: "/icon/typescript.png" },
    { name: "JavaScript", icon: "/icon/js.png" },
    { name: "React", icon: "/icon/atom.png" },
    { name: "Next.js", icon: "/icon/nextjs-icon.png" },
    { name: "Tailwind", icon: "/icon/tailwind-css-icon.png" },
    { name: "MongoDB", icon: "/icon/mongodb-icon.png" },
    { name: "MySQL", icon: "/icon/mysql-database.png" },
    { name: "PostgreSQL", icon: "/icon/postgresql-icon.png" },
    { name: "WordPress", icon: "/icon/wordpress.png" },
    { name: "WordPress", icon: "/icon/ai-technology.png" },
    { name: "WordPress", icon: "/icon/hierarchical-structure.png" },
  ];

  // Group icons into chunks to reduce wave animations
  const marqueeChunks = [];
  const chunkSize = 4;

  for (let i = 0; i < skillIcons.length; i += chunkSize) {
    marqueeChunks.push(skillIcons.slice(i, i + chunkSize));
  }

  // Determine progress bar width based on skill level
  const getProgressWidth = (level: string) => {
    switch (level) {
      case "Expert":
        return "100%";
      case "Advanced":
        return "80%";
      case "Intermediate":
        return "60%";
      default:
        return "40%";
    }
  };

  const marqueeVariants = {
    animate: {
      x: [0, -1920], // Use fixed value instead of percentage
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: prefersReducedMotion ? 60 : 30,
          ease: "linear",
        },
      },
    },
  };

  // Wave animation for chunks, not individual icons
  const waveVariants = {
    animate: (i: number) => ({
      y: prefersReducedMotion ? 0 : [0, -8, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          delay: i * 0.8,
          ease: "easeInOut",
        },
      },
    }),
  };

  return (
    <div className="container mx-auto px-4" ref={ref}>
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>

      {/* Optimized Marquee with Transform instead of layout animations */}
      {isClient && (
        <div className="overflow-hidden w-full relative py-6">
          <motion.div
            className="flex space-x-8 w-max"
            variants={marqueeVariants}
            animate="animate"
            style={{
              willChange: "transform",
            }}
          >
            {/* Show duplicate chunks for seamless loop */}
            {[...marqueeChunks, ...marqueeChunks].map((chunk, chunkIndex) => (
              <motion.div
                key={`chunk-${chunkIndex}`}
                className="flex space-x-8"
                custom={chunkIndex}
                variants={waveVariants}
                animate="animate"
                style={{
                  willChange: "transform",
                }}
              >
                {chunk.map((skill, skillIndex) => (
                  <div
                    key={`${chunkIndex}-${skillIndex}`}
                    className="w-12 h-12 md:w-16 md:h-16 p-2 md:p-3 bg-[#0a0a1f] rounded-full border border-[#ffffff20] shadow-md flex items-center justify-center"
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      width={32}
                      height={32}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Skills List with Progress Bar - simplified animations */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: Math.min(0.05 * index, 0.5) }}
            style={{
              willChange: "transform, opacity",
            }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              {skill.name}
            </h3>
            <div className="w-full h-2 bg-[#ffffff10] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
                initial={{ width: 0 }}
                animate={{ width: getProgressWidth(skill.level) }}
                transition={{
                  duration: 1,
                  delay: Math.min(0.1 * index, 0.8),
                }}
                style={{
                  willChange: "width",
                }}
              />
            </div>
            <p className="text-sm text-[#00ffaa] mt-2">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
