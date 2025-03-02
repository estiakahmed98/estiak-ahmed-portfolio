"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";

// Mock data for gallery images
const galleryItems = [
  {
    id: "1",
    url: "/assets/stamford.jpg",
    title: "Stamford University",
    description: "Campus view of Stamford University Bangladesh",
  },
  {
    id: "2",
    url: "/assets/college.jpg",
    title: "Govt. Ashek Mahmud College",
    description: "Main building of the college",
  },
  {
    id: "3",
    url: "/assets/school.jpg",
    title: "Advocate Khalilur Rahman High School",
    description: "School playground and main gate",
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  // Handle mobile detection and auto-changing images
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-change image on mobile every 1 second
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isMobile) {
      interval = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile]);

  // Handle modal and keyboard events
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGalleryOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen]);

  // Image hover variants for framer-motion
  const imageHoverVariants = {
    initial: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(0, 255, 170, 0)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(0, 255, 170, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Caption variants for framer-motion
  const captionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Mobile image transition variants
  const mobileImageVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Gallery component
  const Gallery = () => (
    <div className="rounded-md w-full mx-auto flex pb-20 pt-10  px-4">
      {isMobile ? (
        // Mobile: Show only one image at a time that changes automatically
        <AnimatePresence mode="wait">
          <motion.div
            key={galleryItems[galleryIndex].id}
            variants={mobileImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-[250px] relative mx-auto"
            onClick={() => setGalleryOpen(true)}
          >
            <Image
              src={galleryItems[galleryIndex].url}
              alt={galleryItems[galleryIndex].title}
              fill
              className="rounded-2xl object-cover"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 rounded-b-2xl"
            >
              <p className="text-center text-sm">
                {galleryItems[galleryIndex].title}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ) : (
        // Desktop: Show all images with hover effect
        galleryItems.map((item, i) => (
          <motion.div
            key={item.id}
            variants={imageHoverVariants}
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className={`rounded-2xl transition-all duration-300 ease-in-out ${
              hoveredIndex === i
                ? "w-[280px] h-[220px] z-10"
                : galleryIndex === i
                ? "w-[250px] h-[200px]"
                : "w-[80px] h-[200px]"
            } flex-shrink-0 relative mr-2 overflow-hidden`}
            onClick={() => {
              setGalleryIndex(i);
              setGalleryOpen(true);
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="rounded-2xl object-cover transition-all duration-300"
            />
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  variants={captionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/20 p-3 rounded-b-2xl"
                >
                  <p className="text-[#00ffaa] font-bold">{item.title}</p>
                  <p className="text-white text-sm">{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );

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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <Gallery />
            </div>
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
