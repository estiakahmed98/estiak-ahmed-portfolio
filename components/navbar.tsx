"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        // Update active section
        const sectionElements = sections
          .map((section) => ({
            id: section.id,
            element: document.getElementById(section.id),
          }))
          .filter((section) => section.element !== null);

        for (const section of sectionElements) {
          if (!section.element) continue;

          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }

        // Update scroll progress
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial compute
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll as any);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#00ffaa]">
          Estiak Ahmed
        </Link>

        <nav className="hidden md:flex space-x-8">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`relative text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "text-[#00ffaa]"
                  : "text-white/80 hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00ffaa]"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          {/* Mobile menu button would go here */}
        </div>
      </div>

      {/* Progress bar under the navbar */}
      <div className="h-0.5 bg-[#0a0a1f] w-full">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ff00aa] to-[#00ffaa]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </header>
  );
}
