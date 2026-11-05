import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { composePortfolio } from "../composition";
import { fadeInUp } from "../utils/animations";

const { latest } = composePortfolio();
const initialCount = 3;

export default function Latest() {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionId = useId();
  const headingId = sectionId + "-heading";
  const gridId = sectionId + "-grid";
  const highlights = showAll ? latest : latest.slice(0, initialCount);

  return (
    <section aria-labelledby={headingId} className="max-w-6xl mx-auto py-8">
      <h2
        id={headingId}
        className="text-3xl font-bold mb-6 text-center text-teal-400"
      >
        Recent Highlights
      </h2>
      <ul
        id={gridId}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6"
      >
        {highlights.map((highlight, index) => (
          <motion.li
            key={highlight.id}
            variants={{
              ...fadeInUp,
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: reduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                  delay: reduceMotion ? 0 : (index % initialCount) * 0.06,
                },
              },
            }}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="min-w-0 flex flex-col break-words bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-[0px_8px_20px_rgba(99,102,241,0.35)] transition-shadow duration-200 motion-reduce:transition-none"
          >
            <h3 className="text-xl font-semibold text-white">
              {highlight.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              {highlight.description}
            </p>
            {highlight.link && (
              <a
                href={highlight.link}
                className="mt-auto pt-4 text-sm font-medium text-teal-400 hover:text-teal-300 underline underline-offset-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                {highlight.linkLabel || "Learn more about " + highlight.title}
              </a>
            )}
          </motion.li>
        ))}
      </ul>
      {latest.length > initialCount && (
        <div className="text-center mt-6">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={gridId}
            onClick={() => setShowAll((expanded) => !expanded)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            {showAll ? "Show Less" : "View All (" + latest.length + ")"}
          </button>
        </div>
      )}
    </section>
  );
}
