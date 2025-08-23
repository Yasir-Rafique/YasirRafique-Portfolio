import { motion } from "framer-motion";
import { publications } from "../data/publications";

export default function Publications() {
  return (
    <section id="publications" className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Publications
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {publications.map((pub, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 hover:shadow-indigo-500/20 transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white">{pub.title}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {pub.platform} • {pub.date}
            </p>
            <p className="text-gray-300 mb-4">
              {pub.description.length > 150
                ? pub.description.slice(0, 150) + "..."
                : pub.description}
            </p>
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
        ))}
      </div>
    </section>
  );
}
