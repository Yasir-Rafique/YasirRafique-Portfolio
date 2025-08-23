import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Latest() {
  const updates = [
    " Latest 👉",
    "1: Just completed the IBM's 'Introduction to Artificial Intelligence (AI)' course! 🎉",
    "2: Launched 'Read Me Genie' - a tool to create stunning GitHub READMEs effortlessly! 🚀",
    "3: Completed Udemy's 'React Native - Mobile App Development (CLI) 2025 Edition' course! 📱",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth);
      setWrapperWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-6">
      <motion.div
        ref={containerRef}
        className="flex gap-16 whitespace-nowrap text-lg font-medium text-gray-700 dark:text-gray-300"
        animate={{ x: [wrapperWidth, -contentWidth] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
          delay: 3,
        }}
      >
        {updates.map((u, i) => (
          <span key={i}>{u}</span>
        ))}
      </motion.div>
    </div>
  );
}
