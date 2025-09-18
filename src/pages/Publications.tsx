import { useState } from "react";
import { motion } from "framer-motion";
import { publications } from "../data/publications";

export default function Publications() {
  const [showAllPublications, setShowAllPublications] = useState(false);

  return (
    <section id="publications" className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Publications
      </motion.h2>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {(showAllPublications ? publications : publications.slice(0, 6)).map(
          (pub, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              //transition={{ delay: index * 0.15 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.35)", // indigo glow
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-white">{pub.title}</h3>

              {/* Meta */}
              <p className="text-sm text-gray-400 mb-2">
                {pub.platform} • {pub.date}
              </p>

              {/* Description */}
              <p className="text-gray-300 mb-4">
                {pub.description.length > 150
                  ? pub.description.slice(0, 150) + "..."
                  : pub.description}
              </p>

              {/* Link */}
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  Read More →
                </a>
              )}
            </motion.div>
          )
        )}
      </div>

      {/* Show More Button */}
      {publications.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAllPublications(!showAllPublications)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
          >
            {showAllPublications
              ? "Show Less"
              : `Show More (${publications.length - 6})`}
          </button>
        </div>
      )}
    </section>
  );
}
