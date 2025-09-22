// pages/Achievements.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";
import { achievements } from "../data/achievements";
import type { Achievement } from "../data/achievements";

export default function Achievements() {
  const [expanded, setExpanded] = useState<boolean[]>(
    Array(achievements.length).fill(false)
  );
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const toggle = (idx: number) =>
    setExpanded((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });

  return (
    <section id="achievements" className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-teal-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Achievements
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2"
      >
        {achievements
          .slice(0, showAllAchievements ? achievements.length : 4)
          .map((a: Achievement, index: number) => {
            const desc = expanded[index]
              ? a.description
              : a.description.slice(0, 3);

            const imageProofs = (a.proofs || []).filter(
              (p) => p.type === "image"
            );
            const linkProofs = (a.proofs || []).filter(
              (p) => p.type === "link"
            );

            return (
              <motion.div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {a.title}
                    </h3>
                    {(a.org || a.date) && (
                      <p className="text-sm text-gray-400 mt-1">
                        {a.org ? `${a.org}` : ""} {a.org && a.date ? "• " : ""}
                        {a.date || ""}
                      </p>
                    )}
                  </div>
                  <span className="mt-1 inline-block w-3 h-3 rounded-full bg-teal-500" />
                </div>

                <ul className="mt-4 list-disc pl-5 text-gray-300 space-y-1">
                  {desc.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>

                {a.description.length > 3 && (
                  <button
                    onClick={() => toggle(index)}
                    className="mt-2 text-xs text-gray-300 hover:underline focus:outline-none"
                  >
                    {expanded[index] ? "Show Less" : "Show More"}
                  </button>
                )}

                {a.tags && a.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-gray-800 text-teal-400 border border-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {linkProofs.length > 0 && (
                  <div className="mt-5 space-y-2">
                    <p className="text-sm text-gray-400">Links:</p>
                    <div className="flex flex-wrap gap-3">
                      {linkProofs.map((p, i) => (
                        <a
                          key={i}
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 underline underline-offset-2"
                        >
                          {p.label || "Open Link"}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block"
                          >
                            <path
                              d="M14 3h7v7M21 3l-9 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {imageProofs.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm text-gray-400 mb-2">Screenshots:</p>
                    <div className="flex flex-wrap gap-3">
                      {imageProofs.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setModalImage(p.url)}
                          className="group relative"
                          aria-label={p.label || "Open screenshot"}
                        >
                          <img
                            src={p.url}
                            alt={p.label || "Proof"}
                            className="h-24 w-36 object-cover rounded-lg border border-gray-700 group-hover:opacity-90 transition"
                          />
                          <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-teal-500/0 group-hover:ring-teal-500/60 transition" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
      </motion.div>

      {/* Show More / Show Less Button */}
      {achievements.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
          >
            {showAllAchievements
              ? "Show Less"
              : `Show More (${achievements.length - 4})`}
          </button>
        </div>
      )}

      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/700 backdrop-blur-sm p-4"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-3 -right-3 bg-gray-900 border border-gray-700 text-gray-300 rounded-full w-8 h-8 hover:text-white"
              onClick={() => setModalImage(null)}
              aria-label="Close"
            >
              ✖
            </button>
            <img
              src={modalImage}
              alt="Achievement proof"
              className="max-h-[80vh] w-full object-contain rounded-xl border border-gray-700"
            />
          </div>
        </div>
      )}
    </section>
  );
}
