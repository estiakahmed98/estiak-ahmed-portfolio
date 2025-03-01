"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const experiences = [
    {
      title: "Jr. Software Engineer",
      company: "Birds Of Eden",
      period: "June 2024 - Present",
      description:
        "Working on design with figma, developing and maintaining web applications using React, Next.js, and Node.js.",
    },
    {
      title: "Intern Software Engineer ",
      company: "Birds Of Eden",
      period: "Jan 2024 - June 2024",
      description:
        "Working on design with figma developing website using React, Next.js, and Node.js.",
    },
    {
      title: "Senior Executive SEO Support",
      company: "Aan-Nahl Software",
      period: "Mar 2022 - Jan 2024",
      description:
        "Worked as Wordpress Developer, Web 2.0 Expart, Online Reputation Management (ORM) Expart & SEO Support",
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
        Experiences
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
                      d="M120 240C186.274 240 240 186.274 240 120C240 53.7258 186.274 0 120 0C53.7258 0 0 53.7258 0 120C0 186.274 53.7258 240 120 240Z"
                      fill="#0A0A1F"
                    />
                    <path
                      d="M180 80H60C53.3726 80 48 85.3726 48 92V172C48 178.627 53.3726 184 60 184H180C186.627 184 192 178.627 192 172V92C192 85.3726 186.627 80 180 80Z"
                      stroke="#00FFAA"
                      strokeWidth="2"
                    />
                    <path d="M48 108H192" stroke="#00FFAA" strokeWidth="2" />
                    <path
                      d="M64 96C65.1046 96 66 95.1046 66 94C66 92.8954 65.1046 92 64 92C62.8954 92 62 92.8954 62 94C62 95.1046 62.8954 96 64 96Z"
                      fill="#FF00AA"
                    />
                    <path
                      d="M76 96C77.1046 96 78 95.1046 78 94C78 92.8954 77.1046 92 76 92C74.8954 92 74 92.8954 74 94C74 95.1046 74.8954 96 76 96Z"
                      fill="#00FFAA"
                    />
                    <path
                      d="M88 96C89.1046 96 90 95.1046 90 94C90 92.8954 89.1046 92 88 92C86.8954 92 86 92.8954 86 94C86 95.1046 86.8954 96 88 96Z"
                      fill="#FFAA00"
                    />
                    <path
                      d="M72 140L84 128L72 116"
                      stroke="#00FFAA"
                      strokeWidth="2"
                    />
                    <path d="M96 140H168" stroke="#00FFAA" strokeWidth="2" />
                    <path d="M96 128H144" stroke="#FF00AA" strokeWidth="2" />
                    <path d="M96 116H120" stroke="#FFAA00" strokeWidth="2" />
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
          <Timeline items={experiences} />
        </motion.div>
      </div>
    </div>
  );
}
