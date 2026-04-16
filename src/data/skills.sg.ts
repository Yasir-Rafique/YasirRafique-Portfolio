export type SkillGroup = {
  heading: string;
  items: string[];
};

const skills: SkillGroup[] = [
  {
    heading: "Backend & API Engineering",
    items: [
      "Node.js, Express.js",
      "RESTful API Design & Development",
      "Third-party Integrations (Stripe, Agora, HubSpot, Imin)",
      "Authentication, Authorization & Security Best Practices",
    ],
  },
  {
    heading: "Databases & Performance Optimization",
    items: [
      "MongoDB, MySQL",
      "Database Modeling & Query Optimization",
      "API Performance Tuning & Latency Reduction",
    ],
  },
  {
    heading: "Cloud & Infrastructure",
    items: [
      "AWS (Deployment, Scaling, Monitoring)",
      "Production Systems Management",
      "Environment Setup (Staging & Production)",
    ],
  },
  {
    heading: "System Design & Architecture",
    items: [
      "Scalable System Design",
      "Modular Architecture",
      "Microservices & Event-driven Systems",
    ],
  },
  {
    heading: "AI & Emerging Technologies",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "OpenAI APIs & Embeddings",
      "Vector Databases (FAISS, In-memory)",
    ],
  },
];

export default skills;
