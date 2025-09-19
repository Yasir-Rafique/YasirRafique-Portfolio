import {
  FaNodeJs,
  FaPython,
  FaAws,
  FaReact,
  FaStripe,
  FaGithub,
  FaBitbucket,
  FaBrain,
  //FaRobot,
  //FaDatabase,
  FaSearch,
} from "react-icons/fa";
import {
  SiExpress,
  SiSwagger,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiVite,
  SiReact,
  SiHubspot,
  SiSocketdotio,
  SiOpenai,
} from "react-icons/si";

export const techStack = [
  // --- Backend ---
  { name: "Node.js", tag: "backend", icon: FaNodeJs },
  { name: "Express", tag: "backend", icon: SiExpress },
  { name: "Swagger API", tag: "backend", icon: SiSwagger },
  { name: "OpenActive", tag: "backend" }, // no icon
  { name: "API Development", tag: "backend" }, // no icon
  { name: "Python", tag: "backend", icon: FaPython },
  { name: "WebSockets", tag: "backend", icon: SiSocketdotio },

  // --- Database / Cloud ---
  { name: "AWS", tag: "cloud", icon: FaAws },
  { name: "MongoDB", tag: "db", icon: SiMongodb },
  { name: "SQL", tag: "db", icon: SiMysql },
  { name: "Firebase", tag: "cloud", icon: SiFirebase },

  // --- Frontend ---
  { name: "React", tag: "frontend", icon: FaReact },
  { name: "Next.js", tag: "frontend", icon: SiNextdotjs },
  { name: "TailwindCSS", tag: "styles", icon: SiTailwindcss },
  { name: "Framer Motion", tag: "ux", icon: SiFramer },
  { name: "TypeScript", tag: "frontend", icon: SiTypescript },
  { name: "Vite", tag: "frontend", icon: SiVite },

  // --- Mobile ---
  { name: "React Native", tag: "mobile", icon: SiReact },
  { name: "Agora", tag: "mobile" }, // no icon

  // --- DevOps / Tools ---
  { name: "Bitbucket", tag: "tools", icon: FaBitbucket },
  { name: "HubSpot", tag: "tools", icon: SiHubspot },
  { name: "Stripe", tag: "tools", icon: FaStripe },
  { name: "GitHub", tag: "tools", icon: FaGithub },
  { name: "Imin", tag: "tools" }, // no icon

  // --- AI / ML ---
  { name: "OpenAI", tag: "ai", icon: SiOpenai },
  //{ name: "LangChain", tag: "ai" }, // icon
  { name: "Generative AI (Gen AI)", tag: "ai", icon: FaBrain }, // conceptual
  { name: "RAG (Retrieval-Augmented Generation)", tag: "ai", icon: FaSearch }, // conceptual
  //{ name: "Vector Databases (FAISS)", tag: "ai" }, // no icon
  { name: "Embeddings", tag: "ai" }, // conceptual
];
