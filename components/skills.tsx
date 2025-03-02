"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
  ];

  // Skill Icons with Wave Effect
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
  ];

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

      {/* Infinite Marquee with Wave Effect */}
      <motion.div className="overflow-hidden w-full relative py-6">
        <motion.div
          className="flex space-x-8 w-max"
          animate={{
            x: ["0%", "-50%"], // Moves left infinitely
            transition: {
              repeat: Infinity,
              duration: 20, // Slower scrolling
              ease: "linear",
            },
          }}
        >
          {[...skillIcons, ...skillIcons].map((skill, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 md:w-16 md:h-16 p-2 md:p-3 bg-[#0a0a1f] rounded-full border border-[#ffffff20] shadow-md flex items-center justify-center"
              animate={{
                y: [0, -12, 0], // Wave-like motion
                transition: {
                  repeat: Infinity,
                  duration: 10, // Slower wave effect
                  delay: index * 0.2, // Staggered motion
                  ease: "easeInOut",
                },
              }}
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Skills List with Progress Bar */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              {skill.name}
            </h3>
            <div className="w-full h-2 bg-[#ffffff10] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
                initial={{ width: 0 }}
                animate={{
                  width:
                    skill.level === "Expert"
                      ? "100%"
                      : skill.level === "Advanced"
                      ? "80%"
                      : "60%",
                }}
                transition={{ duration: 1.5, delay: 0.5 + 0.1 * index }}
              />
            </div>
            <p className="text-sm text-[#00ffaa] mt-2">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
