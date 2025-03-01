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

        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience" className="mt-52">
          <Experience />
        </section>

        <section id="skills" className="mt-52">
          <Skills />
        </section>

        <section id="projects" className="mt-52">
          <Projects />
        </section>

        <section id="education" className="mt-52">
          <Education />
        </section>

        <section id="contact" className="mt-52">
          <Contact />
        </section>

        <Footer />
      </div>
    </main>
  );
}
