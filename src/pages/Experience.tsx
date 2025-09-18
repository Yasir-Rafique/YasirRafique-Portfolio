// src/sections/Experience.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "../data/experiences";

export default function Experience() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [expanded, setExpanded] = useState(
    Array(experiences.length).fill(false)
  );

  const handleToggle = (idx: number) => {
    setExpanded((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-teal-400"
        //initial={{ opacity: 0, y: -20 }}
        //animate={{ opacity: 1, y: 0 }}
      >
        Experience
      </motion.h2>

      <div className="relative border-l border-gray-700 pl-6 space-y-12">
        {experiences
          .slice(0, showAllExperiences ? experiences.length : 3)
          .map((exp, index) => {
            const descToShow = expanded[index]
              ? exp.description
              : exp.description.slice(0, 3);

            return (
              <motion.div
                key={index}
                className="relative bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 flex justify-between items-center"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                //transition={{ delay: index * 0.2 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                {/* Dot */}
                <div className="absolute -left-3 top-6 w-5 h-5 rounded-full bg-teal-500 border-2 border-gray-900"></div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">
                    {exp.role} @ {exp.company}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{exp.duration}</p>

                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      {/* location icon */}…{exp.location}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      {/* work type icon */}…{exp.workType}
                    </span>
                  </div>

                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    {descToShow.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>

                  {exp.description.length > 3 && (
                    <button
                      className="mt-2 text-xs text-gray-300 hover:underline focus:outline-none"
                      onClick={() => handleToggle(index)}
                    >
                      {expanded[index] ? "Show Less" : "Show More"}
                    </button>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-gray-800 text-teal-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right logo */}
                {exp.logo && (
                  <div className="ml-6 flex-shrink-0">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-16 h-16 object-contain rounded-md border border-gray-700 bg-white p-2"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
      </div>

      {/* Show More / Show Less Button */}
      {experiences.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllExperiences(!showAllExperiences)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
          >
            {showAllExperiences
              ? "Show Less"
              : `Show More (${experiences.length - 3})`}
          </button>
        </div>
      )}
    </section>
  );
}
