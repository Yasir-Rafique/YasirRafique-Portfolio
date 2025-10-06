import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const updateVisitorCount = async () => {
      const isLocal = [
        "localhost",
        "127.0.0.1",
        "localhost:5173",
        "localhost:8888",
      ].includes(window.location.hostname);

      if (isLocal) {
        console.log("Skipping visitor count in local development");
        return;
      }

      try {
        const res = await fetch(
          "https://abacus.jasoncameron.dev/hit/yasir-portfolio/visits"
        );
        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`);
        }
        const data = await res.json();
        console.log("Visitor count:", data.value);
      } catch (error) {
        console.error("Visitor count error:", error);
      }
    };

    updateVisitorCount();
  }, []);

  return null;
}
