import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { id: "about", label: "About" },
  { id: "tech", label: "Tech" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
  { id: "resume", label: "Resume", route: "/resume" },
];

export default function Navbar() {
  const [dark, setDark] = useState(() => {
    const saved =
      typeof window !== "undefined" && localStorage.getItem("theme");
    return saved
      ? saved === "dark"
      : window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.a
          href="#about"
          className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          YasirR.
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center font-medium">
          {navItems.map((i) => {
            if (i.id === "resume") {
              return (
                <Link
                  key={i.id}
                  to={i.route!}
                  target="_blank"
                  className="relative text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors"
                >
                  {i.label}
                </Link>
              );
            }

            return (
              <motion.a
                key={i.id}
                href={`#${i.id}`}
                className="relative text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {i.label}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
              </motion.a>
            );
          })}

          {/* Theme toggle button */}
          <motion.button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="p-2 rounded-full border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            whileTap={{ scale: 0.9 }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </nav>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="p-2 rounded-full border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            whileTap={{ scale: 0.9 }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="p-2 rounded-md border dark:border-gray-700"
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800"
        >
          <div className="px-4 py-5 flex flex-col gap-4">
            {navItems.map((i) => {
              if (i.id === "resume") {
                return (
                  <Link
                    key={i.id}
                    to={i.route!}
                    onClick={() => setOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors"
                  >
                    {i.label}
                  </Link>
                );
              }

              return (
                <motion.a
                  key={i.id}
                  href={`#${i.id}`}
                  onClick={() => setOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {i.label}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
}
