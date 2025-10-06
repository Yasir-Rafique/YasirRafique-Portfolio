import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

interface Testimonial {
  fullName: string;
  role: string;
  message: string;
  avatar: string;
  date: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/.netlify/functions/getTestimonials");
        const data = await res.json();
        setTestimonials(data.approvedTestimonials || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  console.log("length", testimonials.length);
  if (testimonials.length === 1) {
    return (
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-16">
        {/* <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400"> Testimonials </h2> */}{" "}
        <p className="text-center text-gray-400 text-lg">
          ⭐ Testimonials are coming soon!{" "}
        </p>{" "}
      </section>
    );
  }

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 py-16">
      {" "}
      <motion.h2
        className="text-3xl font-bold mb-12 text-center text-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {" "}
        Testimonials{" "}
      </motion.h2>{" "}
      {/* Grid */}{" "}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {" "}
        {(showAll ? testimonials : testimonials.slice(0, 6)).map((t, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800"
            variants={fadeInUp}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            {" "}
            {/* Avatar + Name + Role */}{" "}
            <div className="flex items-center mb-4">
              {" "}
              <img
                src={t.avatar}
                alt={t.fullName}
                className="w-12 h-12 rounded-full border-2 border-indigo-400 mr-4"
              />{" "}
              <div>
                {" "}
                <h3 className="text-lg font-semibold text-white">
                  {" "}
                  {t.fullName}{" "}
                </h3>{" "}
                <p className="text-sm text-gray-400">{t.role}</p>{" "}
              </div>{" "}
            </div>{" "}
            {/* Message */} <p className="text-gray-300">{t.message}</p>{" "}
          </motion.div>
        ))}{" "}
      </motion.div>{" "}
      {/* Show More Button */}{" "}
      {testimonials.length > 6 && (
        <div className="text-center mt-8">
          {" "}
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
          >
            {" "}
            {showAll
              ? "Show Less"
              : `Show More (${testimonials.length - 6})`}{" "}
          </button>{" "}
        </div>
      )}{" "}
    </section>
  );
}
