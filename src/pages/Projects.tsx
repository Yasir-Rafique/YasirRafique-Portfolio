// src/sections/Projects.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import projects from "../data/projects";
import { fadeInUp, staggerContainer } from "../utils/animations";

const categories = ["Personal", "Experience", "GitHub"];

export default function Projects() {
  const [active, setActive] = useState("Personal");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [showMoreArr, setShowMoreArr] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleShowMore = (idx: number) => {
    setShowMoreArr((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="projects" ref={ref} className="max-w-6xl mx-auto px-6 py-16">
      {/* Heading */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-teal-400"
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        Projects
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg ${
              active === cat
                ? "bg-teal-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {projects[active as keyof typeof projects].map((proj, index) => {
            const isLong = proj.description.length > 150;
            const showMore = showMoreArr[index] || false;
            const descToShow =
              isLong && !showMore
                ? proj.description.slice(0, 150) + "..."
                : proj.description;
            return (
              <motion.div
                key={proj.title + index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.35)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-white">
                  {proj.title}
                </h3>
                {proj.role && (
                  <p className="text-sm text-gray-400 mb-2">{proj.role}</p>
                )}
                <p className="text-gray-400 text-sm mt-2">{descToShow}</p>
                {isLong && (
                  <button
                    className="mt-1 text-xs text-teal-400 hover:underline focus:outline-none"
                    onClick={() => handleShowMore(index)}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-gray-800 text-teal-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 mt-4">
                  {proj.live && (
                    <a
                      href={proj.live}
                      className="text-sm text-teal-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here to visit
                    </a>
                  )}
                  {proj.source && (
                    <a
                      href={proj.source}
                      className="text-sm text-gray-300 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
