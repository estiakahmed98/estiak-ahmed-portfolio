"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Define Project Type
interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  link?: string;
}

// Sample projects data - moved outside component to prevent recreation
const projects: Project[] = [
  {
    title: "Reputation Prime AI",
    description:
      "AI-Based ERP Software with intelligent automation and insights.",
    longDescription:
      "Reputation Prime AI is a comprehensive ERP solution that leverages artificial intelligence to streamline business operations. The platform offers predictive analytics, automated workflows, and intelligent insights to improve decision-making processes.",
    technologies: [
      "Node.js",
      "TypeScript",
      "PHP",
      "Python",
      "Django",
      "MongoDB",
    ],
    image: "/assets/Reputation Prime.png",
    link: "https://www.figma.com/proto/pZHcEjj8GfZ0xWE5UtjnCk/Untitled?node-id=1-3586&p=f&t=mpOuiH7LszPJrtfv-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
  {
    title: "PCO Training",
    description:
      "UK-Based Driving Training Software. Users can take driving lessons and mock tests.",
    longDescription:
      "PCO Training is a specialized platform for professional drivers in the UK. It offers comprehensive training modules, practice tests, and certification preparation to help drivers meet regulatory requirements and improve their skills.",
    technologies: ["Next.js", "TypeScript", "MongoDB"],
    image: "/assets/Driving Traning.png",
    link: "https://uk-driving-course.vercel.app/",
  },
  {
    title: "Moving Texas",
    description:
      "A Moving Company that helps customers relocate efficiently and seamlessly.",
    longDescription:
      "Moving Texas provides end-to-end relocation services across Texas. The platform matches customers with reliable movers, offers instant quotes, tracks moving progress in real-time, and provides comprehensive moving resources to ensure a stress-free experience.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    image: "/assets/Moving Texas.png",
    link: "https://moving-texas.vercel.app/",
  },
  {
    title: "Islami Dawa Institute",
    description: "A Company Management System for Islamic organizations.",
    longDescription:
      "Islami Dawa Institute's management system streamlines administrative tasks, event management, and educational programs for Islamic organizations. It features integrated calendars, resource allocation tools, and communication portals to enhance operational efficiency.",
    technologies: ["Next.js", "Material UI", "TypeScript", "Calendar"],
    image: "/assets/Islami Dawa.png",
    link: "https://islami-dawa-institute.vercel.app/",
  },
  {
    title: "Birds Of Eden",
    description: "A Software Company Website showcasing products and services.",
    longDescription:
      "Birds Of Eden's corporate website presents their software solutions portfolio, company values, and client case studies. The site features interactive demos, detailed product specifications, and a streamlined contact system for potential clients.",
    technologies: ["Next.js", "Material UI", "TypeScript", "Calendar"],
    image: "/assets/Birds Of Eden.png",
    link: "https://birdsofeden.me/",
  },
  {
    title: "Real Estate",
    description:
      "A Arabian Real Estate Company Website showcasing property Mangement .",
    longDescription:
      "This real estate company platform is designed to manage property listings and user interactions with distinct roles for admins, agents, and clients. Admins can oversee all operations, manage users and properties; agents can add and manage their property listings; while users can browse, filter, and inquire about properties. The system ensures secure role-based access, multilingual support, and smooth communication between all parties involved.",
    technologies: ["Next.js", "ShadCn UI", "TypeScript", "Localization"],
    image: "/assets/realestate.png",
    link: "https://real-estate-admin-jade.vercel.app/en",
  },
  {
    title: "BD Weather Govt. Project",
    description:
      "Professional weather monitoring and forecasting for Bangladesh. Access real-time data, forecasts, and historical trends with our interactive dashboard.",
    longDescription:
      "Advanced Weather Analytics Platform Our sophisticated dashboard provides comprehensive weather insights for Bangladesh with precision and clarity.",
    technologies: [
      "Next.js",
      "ShadCn UI",
      "TypeScript",
      "Material UI",
      "Chart.js",
      "Weather API Create By Own",
    ],
    image: "/assets/Weather.png",
    link: "https://weather-forecast-bd-six.vercel.app/",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Use refs for values that don't need to trigger re-renders
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isModalOpenRef = useRef<boolean>(false);

  // Memoize indices calculations to prevent recalculation on every render
  const { prevIndex, nextIndex } = useMemo(() => {
    return {
      prevIndex: activeIndex === 0 ? projects.length - 1 : activeIndex - 1,
      nextIndex: activeIndex === projects.length - 1 ? 0 : activeIndex + 1,
    };
  }, [activeIndex]);

  // Memoize projects to prevent needless re-renders
  const prevProject = useMemo(() => projects[prevIndex], [prevIndex]);
  const currentProject = useMemo(() => projects[activeIndex], [activeIndex]);
  const nextProject = useMemo(() => projects[nextIndex], [nextIndex]);

  // Optimized mobile check with throttling
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkIsMobile, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Auto-play functionality - optimized to minimize state updates
  useEffect(() => {
    if (isModalOpenRef.current || !isAutoPlaying) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    const startAutoPlay = () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      autoPlayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      }, 2000); // Change slide every 2 seconds
    };

    startAutoPlay();

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
    };
  }, [isAutoPlaying]);

  // Update modal open status in ref to avoid re-renders
  useEffect(() => {
    isModalOpenRef.current = !!selectedProject;

    // Only modify body style if necessary (prevents layout shifts)
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Memoized handlers to prevent recreation on each render
  const handleOpenModal = useCallback((project: Project, index: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Modal content ref for detecting outside clicks
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  // Optimized image navigation
  const navigateImage = useCallback(
    (direction: "prev" | "next", e: React.MouseEvent) => {
      e.stopPropagation();

      setCurrentImageIndex((prevIndex) => {
        if (direction === "prev") {
          return prevIndex === 0 ? projects.length - 1 : prevIndex - 1;
        } else {
          return prevIndex === projects.length - 1 ? 0 : prevIndex + 1;
        }
      });
    },
    []
  );

  // Memoized indicator buttons to prevent recreation
  const indicators = useMemo(() => {
    return projects.map((_, index) => (
      <button
        key={index}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          index === activeIndex ? "bg-purple-500 w-6" : "bg-gray-600"
        }`}
        onClick={() => setActiveIndex(index)}
      />
    ));
  }, [activeIndex]);

  return (
    <div className="container mx-auto px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-[#00ffaa]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PROJECTS
      </motion.h2>

      <div
        className="relative h-80 md:h-96 flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation buttons */}
        <button
          className="absolute left-2 md:left-8 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          onClick={goToPrev}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="absolute right-2 md:right-8 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          onClick={goToNext}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Desktop layout with 3 cards (hide on mobile) */}
        {!isMobile && (
          <>
            {/* Left card (previous project) */}
            <motion.div
              className="absolute left-4 md:left-16 w-60 h-72 rounded-xl overflow-hidden shadow-lg cursor-pointer transform -translate-y-4 opacity-70 hover:opacity-80 transition-all duration-300 hidden md:block"
              onClick={goToPrev}
              whileHover={{ scale: 1.05 }}
              layout
            >
              <div className="relative w-full h-full">
                <Image
                  src={prevProject.image}
                  alt={prevProject.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {prevProject.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {prevProject.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right card (next project) */}
            <motion.div
              className="absolute right-4 md:right-16 w-60 h-72 rounded-xl overflow-hidden shadow-lg cursor-pointer transform -translate-y-4 opacity-70 hover:opacity-80 transition-all duration-300 hidden md:block"
              onClick={goToNext}
              whileHover={{ scale: 1.05 }}
              layout
            >
              <div className="relative w-full h-full">
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {nextProject.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {nextProject.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Middle card (current project) - Responsive for all screens */}
        <motion.div
          className="relative w-full md:w-72 h-full max-w-xs md:max-w-none rounded-xl overflow-hidden shadow-xl cursor-pointer z-20"
          onClick={() => handleOpenModal(currentProject, activeIndex)}
          whileHover={{ scale: 1.03 }}
          layout
          key={activeIndex} // Key for animation when changing projects
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-xl font-bold text-white">
                {currentProject.title}
              </h3>
              <p className="text-sm text-gray-300">
                {currentProject.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {currentProject.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-purple-900/70 rounded-full text-purple-200"
                  >
                    {tech}
                  </span>
                ))}
                {currentProject.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-purple-900/70 rounded-full text-purple-200">
                    +{currentProject.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 md:mt-8 gap-2">{indicators}</div>

      {/* Modal - Using portal for better performance */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalContentRef}
              className="bg-[#1b122e] rounded-xl overflow-hidden max-w-[90vh] max-h-[90vh] overflow-y-auto p-10"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="relative h-40 md:h-60">
                <Image
                  src={projects[currentImageIndex].image}
                  alt={projects[currentImageIndex].title}
                  fill
                  className="object-cover rounded-t-xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b122e] to-transparent"></div>

                {/* Image navigation buttons */}
                <button
                  onClick={(e) => navigateImage("prev", e)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  onClick={(e) => navigateImage("next", e)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                  {projects[currentImageIndex].title}
                </h2>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2">
                      About the Project
                    </h3>
                    <p className="text-gray-300">
                      {projects[currentImageIndex].longDescription ||
                        projects[currentImageIndex].description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {projects[currentImageIndex].technologies.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="text-sm px-3 py-1 md:px-4 md:py-2 bg-purple-900/50 rounded-full text-purple-200"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2">
                      Key Features
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Responsive design optimized for all devices</li>
                      <li>Intuitive user interface for seamless navigation</li>
                      <li>Robust backend architecture for scalability</li>
                      <li>Comprehensive analytics and reporting features</li>
                      <li>Secure authentication and data protection</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.a
                      href={projects[currentImageIndex].link || "#"}
                      className="px-6 py-3 bg-purple-700 hover:bg-purple-600 transition-colors rounded-md flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Visit Project
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12L12 4M12 4H5M12 4V11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.a>

                    <motion.button
                      onClick={handleCloseModal}
                      className="px-6 py-3 border border-purple-500 hover:bg-purple-900/30 transition-colors rounded-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
