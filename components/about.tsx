"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div className="container mx-auto px-4 relative" ref={ref}>
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
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          WHO I AM?
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="md:w-2/3 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-white/90 leading-relaxed">
              My name is Estiak Ahmed. I am a professional and enthusiastic
              programmer in my daily life. I am a quick learner with a
              self-learning attitude. I love to learn and explore new
              technologies and am passionate about problem-solving. I love
              almost all the stacks of web application development and love to
              make the web more open to the world.
            </p>
            <p className="text-white/90 leading-relaxed">
              My core skill is based on JavaScript and I love to do most of the
              things using JavaScript. I am available for any kind of job
              opportunity that suits my skills and interests.
            </p>
          </motion.div>

          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-lg border-4 border-[#00ffaa]/30">
              <Image
                src="/assets/estiak.jpg"
                alt="Estiak Ahmed"
                width={256}
                height={256}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff00aa]/20 to-[#00ffaa]/20"></div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute -right-20 top-1/4 w-40 h-40 bg-[#ff00aa]/30 rounded-full blur-3xl"></div>
      <div className="absolute -left-20 bottom-1/4 w-40 h-40 bg-[#00ffaa]/30 rounded-full blur-3xl"></div>
    </div>
  );
}
