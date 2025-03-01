"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles"; // Import the Sparkles component

export default function Hero() {
  const [title, setTitle] = useState("Jr. Software Engineer");
  const titles = ["Jr. Software Engineer", "UI/UX Designer"];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
      setTitle(titles[(titleIndex + 1) % titles.length]);
    }, 3000);

    return () => clearInterval(interval);
  }, [titles]);

  return (
    <div className="relative container mx-auto px-4 h-screen flex flex-col md:flex-row items-center justify-center gap-8">
      {/* Background Sparkles Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SparklesCore
          id="tsparticlesHero"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#ff00aa"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 md:w-1/2 space-y-6">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hello,
          <br />
          This is <span className="text-[#ff00aa]">Estiak Ahmed</span>, I'm a
          <br />
          Professional{" "}
          <motion.span
            key={title}
            className="text-[#00ffaa] inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.span>
        </motion.h1>

        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://github.com/estiakahmed98"
            className="text-[#ff00aa] hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/estiak-ahmed/"
            className="text-[#ff00aa] hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.facebook.com/estiakahmed.tusher/"
            className="text-[#ff00aa] hover:text-white transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://x.com/EstiakA74501023"
            className="text-[#ff00aa] hover:text-white transition-colors"
          >
            <Twitter size={24} />
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button className="bg-[#0a0a1f] border border-[#ff00aa] text-white hover:bg-[#ff00aa]/20">
            CONTACT ME
          </Button>
          <Button className="bg-gradient-to-r from-[#ff00aa] to-[#00ffaa] text-white hover:opacity-90">
            GET RESUME
          </Button>
        </motion.div>
      </div>

      {/* Code Block */}
      <motion.div
        className="relative z-10 md:w-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-[#0a0a1f]/50 backdrop-blur-sm border border-[#ffffff10] rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="font-mono text-sm text-[#00ffaa]">
            <p>
              const <span className="text-[#ff00aa]">coder</span> = {"{"}
            </p>
            <p className="ml-4">
              name: <span className="text-white">'Estiak Ahmed'</span>,
            </p>
            <p className="ml-4">
              skills: [
              <span className="text-white">
                'Figma', 'React', 'NextJS', 'JavaScript', 'MySQL', 'MongoDB',
                'PostgreSQL', 'WordPress', 'SEO'.
              </span>
              ],
            </p>
            <p className="ml-4">
              hardWorker: <span className="text-white">true</span>,
            </p>
            <p className="ml-4">
              quickLearner: <span className="text-white">true</span>,
            </p>
            <p className="ml-4">
              problemSolver: <span className="text-white">true</span>,
            </p>
            <p className="ml-4">
              hireable: <span className="text-[#ff00aa]">function</span>() {"{"}
            </p>
            <p className="ml-8">return (</p>
            <p className="ml-12">this.hardWorker &&</p>
            <p className="ml-12">this.problemSolver &&</p>
            <p className="ml-12">this.skills.length {">="} 5</p>
            <p className="ml-8">);</p>
            <p className="ml-4">{"}"}</p>
            <p>{"};"}</p>
          </div>
        </div>
      </motion.div>

      {/* Glow Effect Elements */}
      <div className="absolute -right-20 top-1/4 w-40 h-40 bg-[#ff00aa]/30 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 bottom-1/4 w-40 h-40 bg-[#00ffaa]/30 rounded-full blur-3xl"></div>
    </div>
  );
}
