import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function Hero() {
  return (
    <section id="about" className="min-h-[60vh] flex items-center">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left side - Text */}
        <motion.div
          className="md:col-span-6 flex flex-col justify-center"
          variants={fadeInUp}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Hey Its{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Muhammad Yasir Rafique
            </span>
            .
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-4 text-lg max-w-xl">
            I’m a <strong>Senior Web Backend Engineer</strong> with 4+ years of
            expertise in building scalable{" "}
            <strong>
              APIs, cloud-native architectures, and high-performance
            </strong>{" "}
            systems. While my core strength lies in{" "}
            <strong>backend development</strong>, I’m expanding into{" "}
            <strong>full-stack engineering</strong>, bridging backend
            reliability with engaging frontend experiences. Currently, I’m also
            exploring <strong>AI engineering, ethics, and applied GenAI</strong>
            , aligning backend expertise with cutting-edge innovation.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <div className="mt-6 flex gap-3 flex-wrap">
              {/* View Projects */}
              <a
                href="#projects"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                View projects
              </a>

              {/* Contact */}
              <a
                href="#contact"
                className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Contact
              </a>

              {/* GitHub */}
              <a
                href="https://www.github.com/Yasir-Rafique"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaGithub className="text-xl" />
                GitHub
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/yasir-rafique/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FaLinkedin className="text-xl text-blue-600" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          className="md:col-span-6 flex justify-center items-center"
          variants={fadeInUp}
        >
          <img
            src="/20240413_162435.jpg"
            alt="Muhammad Yasir Rafique"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-lg"
            style={{ transform: "scale(1.2)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
