"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import Stack from "@/components/ui/Stack";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
              I am <span className="font-semibold">Estiak Ahmed</span>, a{" "}
              <span className="text-[#00ffaa]">Full Stack Developer</span> with
              3+ years of experience building scalable, high-performance web
              applications. My work bridges{" "}
              <strong>frontend design excellence</strong> with{" "}
              <strong>backend robustness</strong>, ensuring seamless and secure
              user experiences.
            </p>

            <p className="text-white/90 leading-relaxed">
              Currently at <span className="font-semibold">Birds of Eden</span>,
              I focus on <strong>Next.js, TypeScript, Tailwind CSS,</strong> and
              secure authentication flows. I specialize in turning complex
              business requirements into intuitive digital solutions, while
              optimizing for performance, scalability, and reliability.
            </p>

            <p className="text-white/90 leading-relaxed">
              My skill set includes{" "}
              <strong>
                JavaScript, TypeScript, React, Next.js, Python, SQL/NoSQL
                databases (PostgreSQL, MongoDB, MySQL), REST APIs, and modern UI
                frameworks
              </strong>
              . I also leverage{" "}
              <strong>Redux, Git, and automated testing tools</strong> to
              maintain clean, production-ready codebases.
            </p>

            <p className="text-white/90 leading-relaxed">
              Beyond web development, I explore{" "}
              <span className="text-[#00ffaa] font-semibold">
                AI Prompt Engineering and LLM Integration
              </span>
              , embedding intelligent, context-aware features into applications.
              My goal is to build digital products that are not only functional
              but also adaptive, future-ready, and impactful.
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
