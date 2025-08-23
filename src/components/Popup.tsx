import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TechPopup() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-2xl px-6 py-4 shadow-2xl text-center max-w-sm"
          >
            <h2 className="text-lg font-bold text-indigo-600">⚡ Built With</h2>
            <p className="text-gray-700 dark:text-gray-300">
              React + Vite + TypeScript
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
