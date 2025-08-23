import type { Variants } from "framer-motion";

// 🔹 Fade in + slide up
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInUpIcon: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1, ease: "easeOut" } },
};

// 🔹 Stagger children (for container elements)
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.5, delayChildren: 0.5 },
  },
};

// 🔹 Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeOut" } },
};

// 🔹 Fade in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.6, ease: "easeOut" } },
};

// 🔹 Scale in (for icons/images)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

// 🔹 Hover effects
export const hoverEffects: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

export const hoverGlow = {
  scale: 1.05,
  boxShadow: "0px 0px 12px rgba(0, 255, 204, 0.6)",
  transition: { duration: 0.3 },
};
