import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
//import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_c46f4tp",
        "template_tns0t98",
        formData,
        "v7Vi5QCJwWOydkLFB"
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <motion.section
      className="py-20 px-6 bg-gray-900 text-white rounded-xl"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        variants={fadeInUp}
      >
        Contact Me
      </motion.h2>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-lg"
        variants={fadeInUp}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition duration-300"
        >
          Send Message
        </button>
      </motion.form>

      {/* Social Links */}
      {/* <motion.div className="mt-10 text-center" variants={fadeInUp}>
        <p className="text-lg font-medium mb-4">Or connect with me on:</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/yasir-rafique"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition"
          >
            <FaLinkedin size={24} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Yasir-Rafique"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <FaGithub size={24} />
            GitHub
          </a>
        </div>
      </motion.div> */}
    </motion.section>
  );
}
