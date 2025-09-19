export type Publications = {
  title: string;
  platform?: string;
  date?: string;
  description: string;
  link?: string;
  showResume?: boolean;
};

export const publications: Publications[] = [
  {
    title:
      "Lean RAG MVPs: How to Build Retrieval-Augmented Tools Without Heavy Infrastructure",
    platform: "Dev Community",
    date: "September 2025",
    description:
      "Retrieval-Augmented Generation (RAG) is one of the most exciting ways to build AI tools today. It allows large language models (LLMs) to use external knowledge, making their answers more accurate and up to date. But there’s a catch: most guides and tutorials push you toward heavy setups, managed vector databases, planned frameworks, and lots of moving parts. That’s great if you’re running a large-scale system, but it’s overkill if you just want to test an idea or build a minimum viable product (MVP).",
    link: "https://dev.to/yasir_rafique_27550feb631/lean-rag-mvps-how-to-build-retrieval-augmented-tools-without-heavy-infrastructure-4bfo",
    showResume: true,
  },
  {
    title:
      "When Code Collides: How to Prevent Data Loss in Node.js Apps with Cron Jobs and API Calls",
    platform: "Dev Community",
    date: "July 2025",
    description:
      "This kind of “collision” between code is more common than we imagine. In this article, I’ll break down why this happens, how it can mess up your app, and most importantly - show you practical ways to fix it. Whether you’re building something big or just learning, these lessons can save you hours of debugging and a lot of headaches.",
    link: "https://dev.to/yasir_rafique_27550feb631/when-code-collides-how-to-prevent-data-loss-in-nodejs-apps-with-cron-jobs-and-api-calls-2l3n",
    showResume: true,
  },
  {
    title: "Node.js Memory Leaks: A Guide to Detection and Resolution",
    platform: "Dev Community",
    date: "November 2024",
    description:
      "It's important to realize that memory leaks aren't just an inconvenience but a critical business concern. Intermittent performance degradation during peak usage was the most common issue facing the team when I first joined Find My Facility, and it wasn't for a while until we discovered that memory leaks were the culprit. Operational costs ballooned and user experience plummeted as memory leaks degraded app performance over time.",
    link: "https://dev.to/yasir_rafique_27550feb631/nodejs-memory-leaks-a-guide-to-detection-and-resolution-4mo5",
  },
  {
    title:
      "Taming Memory Leaks in Node.js: A Deep Dive | Muhammad Yasir Rafique | Conf42 JS 2024",
    platform: "Youtube | Conf42",
    date: "October 2024",
    description:
      "Memory leaks occur when a program retains memory it no longer needs, leading to performance degradation. In this talk, we’ll explore how memory leaks manifest in Node.js applications and their impact on system resources. We’ll discuss common causes of memory leaks, including unintentional global variables, forgotten timers or callbacks, and improper caching strategies. Attendees will learn practical techniques for detecting memory leaks using tools like Node.js built-in profiler, Chrome DevTools, and third-party libraries. We’ll also cover strategies for preventing memory leaks through best coding practices and effective resource management.",
    link: "https://www.youtube.com/watch?v=A1zbvng3KtM",
    showResume: true,
  },
  {
    title:
      "Artificial Intelligence in Cybersecurity: New Solutions for New Threats",
    platform: "Dev Community",
    date: "October 2024",
    description:
      "The rapid development of artificial intelligence is one of the most important technological trends of recent years and the years to come. Nowadays, some see AI and neural networks as a universal solution to many technical and social problems. Others believe that nothing good will come of it. As usual, the truth lies somewhere in the middle. Artificial intelligence is a two-edged sword that can be used in different ways, depending on whose hands it is in. Today, we're going to talk about how AI is being used in cybersecurity and the cyberattacks it's preventing.",
    link: "https://dev.to/yasir_rafique_27550feb631/artificial-intelligence-in-cybersecurity-new-solutions-for-new-threats-1bg2",
  },
  {
    title: "JavaScript Frameworks: The Past, the Present, and the Future",
    platform: "DZone",
    date: "August 2024",
    description:
      "When we talk about web development, we cannot help but mention JavaScript. Throughout the past several decades, JavaScript frameworks have been the backbone of web development, defining its direction. The capabilities of JavaScript tools have been steadily growing, enabling the creation of faster, more complex, and more efficient websites. This evolution has made a huge leap from jQuery to React, Angular, and Vue.js. We will look at the major milestones in the evolution of the JavaScript framework that have defined web development as we know it today.",
    link: "https://dzone.com/articles/javascript-frameworks-past-present-and-future",
    showResume: true,
  },
  {
    title: "Serverless Computing in 2024",
    platform: "TechBullion",
    date: "February 2024",
    description:
      "As a professional in the industry, I believe that the serverless computing model is not declining but rather evolving. The initial hype may have settled as organizations gained a more realistic understanding of its strengths and limitations. However, with increasing adoption and advancements in technology, serverless computing is still poised to transform how applications are developed and deployed.",
    link: "https://techbullion.com/serverless-computing-in-2024-interview-with-backend-engineer-muhammad-yasir-rafique/",
  },
  {
    title: "The Rise of TypeScript: Why is It Taking Over Web Development?",
    platform: "HashNode",
    date: "November 2023",
    description:
      "JavaScript remains the gold standard of web development. According to the annual Stack Overflow survey, in 2023, JavaScript became the world’s most commonly used programming language for the 11th year in a row. In 2022, the State of JS Survey found that JavaScript had a 78% usage rate among developers. However, in the last three years, JavaScript has seen its user share slightly decrease, with many industry experts calling it the main reason. This programming language has tripled its userbase in the last six years, finishing at the fifth spot of the most popular programming languages in 2023, according to Stack Overflow. What are the reasons for TypeScript’s meteoric rise in popularity, and will it topple JavaScript from its pedestal? Let’s try to find answers to these questions!",
    link: "https://yasirrafique.hashnode.dev/the-rise-of-typescript-why-is-it-taking-over-web-development",
  },
  {
    title: "Vue 3: How New Features Can Improve Your Projects",
    platform: "TechBullion",
    date: "May 2022",
    description:
      "As a software engineer, I am used to the never ending quest to streamline development processes to get the result you need. This is why I am always on the lookout for tools and frameworks that will help increase productivity and decrease possible risks. In this article, I will take a closer look at Vue 3, a framework for building user interfaces and single-page applications. I will focus on its features and explain why I find them good or not so good.",
    link: "https://techbullion.com/vue-3-how-new-features-can-improve-your-projects/",
  },
];
