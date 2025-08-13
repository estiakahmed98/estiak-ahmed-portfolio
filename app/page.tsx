import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Projects from "@/components/projects";
import Experience from "@/components/experience";

// import Index from "@/components/ui/StackingCards";

export default function Home() {
  return (
    <>
      <main>
        <div className="relative min-h-screen overflow-hidden bg-[#0a0a1f]">
          <BackgroundGradientAnimation interactive={false}>
            <div className="absolute inset-0 z-0 bg-[#0a0a1f]/80" />
          </BackgroundGradientAnimation>

          <div className="relative z-10">
            <Navbar />

            <section id="home">
              <Hero />
            </section>
          </div>
        </div>
        <div>
          <section id="about">
            <About />
          </section>

          <section id="experience" className="mt-52">
            <Experience />
          </section>

          <section id="skills" className="mt-52">
            <Skills />
          </section>

          <section id="projects" className="mt-44">
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
    </>
  );
}
