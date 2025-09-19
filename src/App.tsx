//import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Reveal from "./components/Reveal";
import BackgroundLayout from "./components/Background";
import VisitorTracker from "./components/VisitorTracker";
import Latest from "./components/Latest";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Publications from "./pages/Publications";
import Achievements from "./pages/Achievements";

import ResumeRoute from "./pages/Resume";
import { Toaster } from "react-hot-toast";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/resume";

  return (
    <>
      <BackgroundLayout />
      <div className="min-h-screen">
        {!hideNavbar && <Navbar />}
        <main className="max-w-6xl mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Latest />
                  <section id="tech" className="py-12">
                    <Reveal animation="fade-up">
                      <TechStack />
                    </Reveal>
                  </section>
                  <section id="achievements" className="py-12">
                    <Reveal animation="fade-left">
                      <Achievements />
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
                </>
              }
            />
            <Route path="/resume" element={<ResumeRoute />} />
          </Routes>
        </main>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <VisitorTracker />
    </>
  );
}
