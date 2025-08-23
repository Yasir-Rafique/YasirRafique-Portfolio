import { techStack } from "../data/techStack";
import { motion } from "framer-motion";
import {
  //staggerContainer,
  fadeInUp,
  fadeInUpIcon,
  //hoverEffects,
} from "../utils/animations";

export default function TechStack() {
  return (
    <section className="py-12">
      {/* Heading */}
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        My Tech Stack
      </motion.h2>

      {/* Tech items with staggered fade-in */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        variants={fadeInUpIcon}
        initial="hidden"
        animate="visible"
      >
        {techStack.map((t) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.name}
              className="flex items-center gap-2 px-4 py-2 border rounded-xl shadow-sm 
                 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm cursor-pointer"
              variants={fadeInUpIcon}
              whileHover={{ scale: 1.05 }}
            >
              {Icon && <Icon className="text-xl text-blue-500" />}
              <span className="font-medium">{t.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
