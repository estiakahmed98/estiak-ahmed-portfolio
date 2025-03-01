"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const educations = [
    {
      degree: "BSC in CSE",
      institution: "Stamford University Bangladesh",
      period: "2023",
    },
    {
      degree: "HIGHER SECONDARY CERTIFICATE",
      institution: "Govt. Ashek Mahmud Collage Jamalpur",
      period: "2017",
    },
    {
      degree: "SECONDARY SCHOOL CERTIFICATE",
      institution: "Advocate Khalilur Rahman High School",
      period: "2014",
    },
  ];

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mt-8 mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Educations
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full h-[400px]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff00aa]/20 to-[#00ffaa]/20 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="240"
                    height="240"
                    viewBox="0 0 240 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M120 20L220 80V180L120 240L20 180V80L120 20Z"
                      stroke="#00FFAA"
                      strokeWidth="2"
                    />
                    <path d="M120 20V120" stroke="#00FFAA" strokeWidth="2" />
                    <path
                      d="M220 80L120 120"
                      stroke="#00FFAA"
                      strokeWidth="2"
                    />
                    <path d="M20 80L120 120" stroke="#00FFAA" strokeWidth="2" />
                    <path d="M120 240V120" stroke="#FF00AA" strokeWidth="2" />
                    <circle
                      cx="120"
                      cy="120"
                      r="20"
                      fill="#0A0A1F"
                      stroke="#FF00AA"
                      strokeWidth="2"
                    />
                    <circle cx="120" cy="20" r="8" fill="#00FFAA" />
                    <circle cx="220" cy="80" r="8" fill="#00FFAA" />
                    <circle cx="220" cy="180" r="8" fill="#00FFAA" />
                    <circle cx="120" cy="240" r="8" fill="#FF00AA" />
                    <circle cx="20" cy="180" r="8" fill="#00FFAA" />
                    <circle cx="20" cy="80" r="8" fill="#00FFAA" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#ff00aa]/30 rounded-full blur-2xl"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#00ffaa]/30 rounded-full blur-2xl"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TracingBeam>
            {educations.map((education, index) => (
              <div key={index} className="mb-16 relative">
                <div className="text-[#00ffaa] text-sm mb-2">
                  {education.period}
                </div>
                <h3 className="text-2xl font-bold mb-2">{education.degree}</h3>
                <p className="text-white/70">{education.institution}</p>
              </div>
            ))}
          </TracingBeam>
        </motion.div>
      </div>
    </div>
  );
}
