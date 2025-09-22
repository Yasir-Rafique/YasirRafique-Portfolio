// src/data/skills.ts
export type SkillGroup = {
  heading: string;
  items: string[];
};

// const skills: SkillGroup[] = [
//   {
//     heading: "Artificial Intelligence & LLM Applications",
//     items: [
//       "Retrieval-Augmented Generation (RAG)",
//       "OpenAI GPT Models, Embeddings",
//       "Vector Databases: FAISS, In-memory Stores",
//       "Prompt Engineering",
//       "AI Ethics, Cost Optimization",
//     ],
//   },
//   {
//     heading: "Web & Backend Development",
//     items: [
//       "RESTful APIs, OpenActive",
//       "Node.js, Express.js",
//       "HubSpot, Imin, Stripe, Agora",
//       "Database Modeling, Authentication, Security",
//       "Vue.js, Bootstrap",
//     ],
//   },
//   {
//     heading: "Programming Languages",
//     items: ["JavaScript", "Python", "PHP", "C++", "C#", "SQL"],
//   },
//   {
//     heading: "Frameworks & Libraries",
//     items: ["Node.js", "Laravel", "Django", "Vue.js"],
//   },
//   {
//     heading: "Databases",
//     items: ["MongoDB", "MySQL"],
//   },
//   {
//     heading: "Software Architecture & Practices",
//     items: [
//       "OOP",
//       "MVC",
//       "Microservices",
//       "SOLID Principles",
//       "Repository Pattern",
//     ],
//   },
//   {
//     heading: "Collaboration, Agile & Debugging",
//     items: [
//       "Agile (Scrum, Sprint Planning)",
//       "Code Reviews, Pair Programming, Documentation",
//       "Performance Tuning, Memory Leak Analysis, API Profiling",
//     ],
//   },
// ];

const skills: SkillGroup[] = [
  {
    heading: "Artificial Intelligence & LLM Applications",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "OpenAI GPT Models & Embeddings",
      "Vector Databases: FAISS, In-memory Vector Stores",
      "Prompt Engineering",
      //"PDF Ingestion & Text Chunking Pipelines",
      //"Semantic Search & Retrieval",
      "Ethical AI Practices & Cost Optimization",
    ],
  },
  {
    heading: "Web & Backend Development",
    items: [
      "API Development: RESTful APIs, OpenActive standards, third-party API integrations (HubSpot, Imin, Stripe, Agora)",
      "Backend Development: Node.js, Express.js, database modeling, authentication, and security best practices",
      "Frontend Basics: Vue.js, Bootstrap",
    ],
  },
  {
    heading: "Programming & Software Development",
    items: [
      "Languages: JavaScript, Python, PHP, C++, C#, SQL",
      "Frameworks & Libraries: Node.js, Laravel, Django, Vue.js",
      "Databases: MongoDB, MySQL",
    ],
  },
  {
    heading: "Software Architecture & Development Practices",
    items: [
      "Object-Oriented & Functional Programming/Design: OOP principles, MVC, microservices",
      "Design Patterns: SOLID principles, repository pattern",
    ],
  },
  {
    heading: "Team, Agile Collaboration & Testing/Debugging",
    items: [
      "Agile Development: Sprint planning, backlog grooming, daily stand-ups",
      "Collaboration & Communication: Code reviews, pair programming, documentation",
      "Debugging & Optimization: Performance tuning, memory leak analysis, API profiling",
    ],
  },
];

export default skills;
