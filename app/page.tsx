"use client";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a1f]">
      <BackgroundGradientAnimation>
        <div className="absolute inset-0 z-0 bg-[#0a0a1f]/80" />
      </BackgroundGradientAnimation>

      <div className="relative z-10">
        <Navbar scrollProgress={scrollProgress} />

        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <section id="about" className="min-h-screen ">
          <About />
        </section>

        <section id="experience" className="min-h-screen ">
          <Experience />
        </section>

        <section id="skills" className="min-h-screen ">
          <Skills />
        </section>

        <section id="projects" className="min-h-screen ">
          <Projects />
        </section>

        <section id="education" className="min-h-screen pt-10">
          <Education />
        </section>

        <section id="contact" className="min-h-screen ">
          <Contact />
        </section>

        <Footer />
      </div>
    </main>
  );
}
