"use client";

import { useRef, useEffect, useState, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface TestimonialProps {
  src: string;
  isActive: boolean;
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Work Experience Data
  const experiences = [
    {
      title: "Full Stack Software Engineer",
      company: "Birds Of Eden",
      period: "June 2023 - Present",
      description:
        "Working on design with Figma, developing and maintaining web applications using React js, Next.js, and Node.js.",
    },
    {
      title: "Jr. Software Engineer",
      company: "Aan-Nahl Software",
      period: "Mar 2021 - Jan 2023",
      description:
        "Developing and maintaining web applications using React js, Next.js, Wordpress Theme Development, and Node.js.",
    },
  ];

  // Animated Image Carousel Data
  const testimonials = [
    { src: "/assets/aannahl.png" },
    { src: "/assets/boed.png" },
    { src: "/assets/netrep.png" },
  ];

  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []); // ✅ Added dependency array

  return (
    <div className="container mx-auto px-4" ref={ref}>
      {/* Section Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        Experiences
      </motion.h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Animated Image Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full h-[300px] flex flex-col items-center">
            {" "}
            {/* ✅ Reduced height for better UX */}
            <div className="relative h-64 w-full bg-white rounded-3xl p-4 shadow-lg">
              {" "}
              {/* ✅ Reduced height */}
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <MemoizedTestimonial
                    key={testimonial.src}
                    src={testimonial.src}
                    isActive={index === active}
                  />
                ))}
              </AnimatePresence>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handlePrev}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Experience Timeline */}
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

// ✅ Memoized Testimonial to prevent unnecessary re-renders
const MemoizedTestimonial = memo(({ src, isActive }: TestimonialProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.95,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="absolute inset-0 origin-bottom"
    >
      <Image
        src={src}
        alt="Company Logo"
        width={300} // ✅ Reduced size
        height={300}
        draggable={false}
        loading="lazy" // ✅ Enabled lazy loading
        className="h-full w-full rounded-3xl object-cover object-center"
      />
    </motion.div>
  );
});
