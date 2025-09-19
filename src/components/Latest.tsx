import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { latest } from "../data/latest";

export default function Latest() {
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
        {latest.map((u, i) => (
          <span key={i} className="mr-4">
            {i === 0 && <span className="mr-4">Latest 👉 </span>}
            {u}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
