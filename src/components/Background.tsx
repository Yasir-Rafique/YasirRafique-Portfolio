import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

export default function BackgroundParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: { value: 100 },
          color: { value: "#00ffcc" },
          links: {
            enable: true,
            color: "#00ffcc",
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
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
        background: {
          color: "transparent",
        },
      }}
    />
  );
}
