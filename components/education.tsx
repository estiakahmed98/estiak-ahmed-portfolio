"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import debounce from "lodash.debounce";

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

const educations = [
  {
    degree: "BSC in CSE",
    institution: "Stamford University Bangladesh",
    gpa: "CGPA: 3.20 out of 4",
    period: "2023",
  },
  {
    degree: "HIGHER SECONDARY CERTIFICATE",
    institution: "Govt. Ashek Mahmud Collage Jamalpur",
    gpa: "GPA: 3.33 out of 5.00",
    period: "2017",
  },
  {
    degree: "SECONDARY SCHOOL CERTIFICATE",
    institution: "Advocate Khalilur Rahman High School",
    gpa: "CGPA: 5.00 out of 5.00",
    period: "2014",
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Debounced mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const debouncedResize = debounce(handleResize, 200);

    handleResize(); // Initial check
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel();
    };
  }, []);

  // Auto-change image on mobile
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMobile && !isGalleryOpen) {
      interval = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
      }, 3000); // Increased interval for better UX
    }
    return () => clearInterval(interval);
  }, [isMobile, isGalleryOpen]);

  // Handle modal and keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGalleryOpen(false);
      } else if (event.key === "ArrowLeft") {
        setGalleryIndex(
          (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
        );
      } else if (event.key === "ArrowRight") {
        setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
      }
    };

    if (isGalleryOpen) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, galleryIndex]);

  // Gallery component
  const Gallery = useCallback(
    () => (
      <div className="rounded-md w-full mx-auto flex pb-20 pt-10 px-4">
        {isMobile ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={galleryItems[galleryIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full h-[250px] relative mx-auto"
              onClick={() => setGalleryOpen(true)}
            >
              <Image
                src={galleryItems[galleryIndex].url}
                alt={galleryItems[galleryIndex].title}
                fill
                className="rounded-2xl object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
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
          galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
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
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              />
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/20 p-3 rounded-b-2xl"
                >
                  <p className="text-[#00ffaa] font-bold">{item.title}</p>
                  <p className="text-white text-sm">{item.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    ),
    [galleryIndex, hoveredIndex, isMobile]
  );

  // Modal component
  const Modal = useMemo(
    () => (
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryOpen(false)}
          >
            <motion.div
              className="bg-[#1a1a1a] rounded-lg max-w-[40vh] md:max-w-[80vh]  max-h-[80vh] p-6 relative mr-10"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[galleryIndex].url}
                alt={galleryItems[galleryIndex].title}
                width={800}
                height={600}
                className="rounded-lg object-cover w-full h-[400px]"
                priority
              />
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-[#00ffaa]">
                  {galleryItems[galleryIndex].title}
                </h2>
                <p className="text-white/80 mt-2">
                  {galleryItems[galleryIndex].description}
                </p>
              </div>
              <button
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                onClick={() => setGalleryOpen(false)}
              >
                ✕
              </button>
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                onClick={() =>
                  setGalleryIndex(
                    (prev) =>
                      (prev - 1 + galleryItems.length) % galleryItems.length
                  )
                }
              >
                ←
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                onClick={() =>
                  setGalleryIndex((prev) => (prev + 1) % galleryItems.length)
                }
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [isGalleryOpen, galleryIndex]
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
                <p className="text-white/70 mb-2">{education.gpa}</p>
                <p className="text-white/70">{education.institution}</p>
              </div>
            ))}
          </TracingBeam>
        </motion.div>
      </div>

      {Modal}
    </div>
  );
}
