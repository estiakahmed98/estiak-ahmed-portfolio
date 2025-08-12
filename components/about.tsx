"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import Stack from "@/components/ui/Stack"; // Import the Stack component
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Stack images
  const images = [
    { id: 1, img: "/assets/estiak.jpg" },
    { id: 2, img: "/assets/estiak2.jpg" },
    { id: 3, img: "/assets/estiak3.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 relative" ref={ref}>
      {/* Sparkle Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00ffaa"
        />
      </motion.div>

      <div className="relative z-10">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          WHO I AM?
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            className="md:w-2/3 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-white/90 leading-relaxed">
              I am Estiak Ahmed, a passionate and detail-oriented UI/UX designer
              and Full Stack developer committed to crafting intuitive and
              visually engaging digital experiences. With a strong foundation in
              design principles and development, I bridge the gap between
              aesthetics and functionality, ensuring seamless user interactions.
            </p>
            <p className="text-white/90 leading-relaxed">
              Motivated software engineer with 3 years of experience in
              full-stack web development and digital solutions. Proven expertise
              in creating scalable, high-performance applications and optimizing
              user experiences through strategic design and development. Skilled
              at implementing secure authentication processes and advanced
              frontend/ backend integrations, contributing directly to improved
              application reliability and user satisfaction. Passionate about
              continuous learning, collaboration, and leveraging technology to
              drive meaningful product innovation and impactful digital
              experiences.
            </p>
            <p className="text-white/90 leading-relaxed">
              Proficient in JavaScript, TypeScript, React, Next.js, and modern
              UI frameworks, I specialize in building scalable, high-performance
              applications. My expertise extends beyond coding—I focus on
              creating user-centered designs that enhance usability and
              accessibility. Dedicated to continuous learning, I thrive on
              solving complex problems and staying ahead of emerging
              technologies. I am eager to contribute my skills to innovative
              projects and collaborative teams.
            </p>
            <p className="text-white/90 leading-relaxed">
              I also specialize in AI Prompt Engineering and LLM (Large Language
              Model) integration, enabling intelligent, context-aware systems.
              My work in this area focuses on building seamless interactions
              between AI and user interfaces, crafting prompts that maximize AI
              effectiveness, and embedding real-time AI insights directly into
              modern web applications for transformative digital experiences.
            </p>
          </motion.div>

          {/* Stack Component */}
          <motion.div
            className="md:w-56 md:h-56"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={true}
              cardDimensions={{ width: 200, height: 200 }}
              cardsData={images}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
