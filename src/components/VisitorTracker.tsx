import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const updateVisitorCount = async () => {
      if (
        window.location.hostname === "localhost" ||
        "127.0.0.1" ||
        "localhost:5173"
      ) {
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
