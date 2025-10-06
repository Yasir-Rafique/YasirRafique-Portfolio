// src/routes/Testimonial.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";

export interface TestimonialFormData {
  fullName: string;
  role: string;
  message: string;
  avatar: string; // Will hold either image URL or "initials"
  status: "pending";
}

// ✅ Predefined avatars (stored in public/avatars/)
const avatarOptions = [
  "/avatars/Male-1.svg",
  "/avatars/Female-1.svg",
  "/avatars/Male-2.svg",
  "/avatars/Male-3.svg",
  "/avatars/Female-2.svg",
  "/avatars/Female-3.svg",
  "/avatars/Male-4.svg",
  "/avatars/Male-5.svg",
  "/avatars/Female-4.svg",
  "initials", // 10th option for initials
];

// ✅ Utility: Generate initials SVG data URL
function generateInitialsAvatar(name: string): string {
  const initials = name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  const bgColor = "#e5e7eb"; // light gray
  const textColor = "#1f2937"; // dark gray
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="${bgColor}" rx="50"/>
      <text x="50%" y="55%" text-anchor="middle" font-size="36" font-family="Arial, sans-serif"
        fill="${textColor}" dy=".3em">${initials}</text>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const TestimonialRoute: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatar) {
      toast.error("Please select an avatar before submitting.");
      return;
    }

    const finalAvatar =
      avatar === "initials" ? generateInitialsAvatar(fullName) : avatar;

    const formData: TestimonialFormData = {
      fullName,
      role,
      message,
      avatar: finalAvatar,
      status: "pending",
    };

    try {
      const res = await fetch("/.netlify/functions/addTestimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Testimonial submitted for review!");
      } else {
        toast.error("Failed to save testimonial.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }

    setFullName("");
    setRole("");
    setMessage("");
    setAvatar("");
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Share Your Testimonial
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-medium mb-1">Role / Title</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Avatars */}
        <div>
          <label className="block font-medium mb-2">Choose Your Avatar</label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {avatarOptions.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setAvatar(url)}
                className={`relative rounded-full p-1 transition-transform transform hover:scale-105 ${
                  avatar === url
                    ? "ring-4 ring-blue-500"
                    : "ring-2 ring-transparent"
                }`}
              >
                {url === "initials" ? (
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 text-xl font-semibold shadow-md">
                    {fullName
                      ? fullName
                          .split(" ")
                          .map((n) => n[0]?.toUpperCase())
                          .join("")
                          .slice(0, 2)
                      : "?"}
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`avatar-${idx}`}
                    className="w-20 h-20 rounded-full shadow-md bg-white"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Testimonial
          </button>
        </div>
      </form>
    </div>
  );
};
