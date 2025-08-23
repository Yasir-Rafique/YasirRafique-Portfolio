import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Reveal from "./components/Reveal";
import TechPopup from "./components/Popup";
import BackgroundLayout from "./components/Background";
import Latest from "./components/Latest";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Publications from "./pages/Publications";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <BackgroundLayout />
      <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4">
          <TechPopup />
          <Hero />
          <Latest />
          <section id="tech" className="py-12">
            <Reveal animation="fade-up">
              <TechStack />
            </Reveal>
          </section>
          <section id="projects" className="py-12">
            <Reveal animation="fade-left">
              <Projects />
            </Reveal>
          </section>
          <section id="experience" className="py-12">
            <Reveal animation="zoom-in">
              <Experience />
            </Reveal>
          </section>
          <section id="publications" className="py-12">
            <Reveal animation="zoom-in">
              <Publications />
            </Reveal>
          </section>
          <section id="contact" className="py-12">
            <Reveal>
              <Contact />
            </Reveal>
          </section>
        </main>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
