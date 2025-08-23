import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
  const [init, setInit] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  // Initialize tsparticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 🎯 Recompute options when darkMode changes
  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      particles: {
        number: { value: 100 },
        color: { value: darkMode ? "#3b82f6" : "#00ffcc" }, // blue in dark, teal in light
        links: {
          enable: true,
          color: darkMode ? "#3b82f6" : "#00ffcc",
          distance: 150,
          opacity: 0.4,
        },
        move: { enable: true, speed: 1 },
        size: { value: { min: 2, max: 4 } },
        opacity: { value: 0.6 },
        shape: { type: "circle" },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
        },
      },
      background: {
        color: "transparent",
      },
    }),
    [darkMode] // 👈 forces re-render when theme changes
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
}
