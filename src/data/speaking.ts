// src/data/speaking.ts
export type Speaking = {
  title: string;
  event: string;
  date: string;
  description: string;
  showResume?: boolean;
};

const speaking: Speaking[] = [
  {
    title: "Memory Leaks in Node.js",
    event: "Conf42",
    date: "Oct 31, 2024",
    description:
      "Presented strategies for detecting, debugging, and preventing memory leaks in Node.js applications.",
    //showResume: true,
  },
  {
    title: "Unleashing the Power of JavaScript",
    event: "Terricon Valley IT Conference",
    date: "Oct 12, 2024",
    description:
      "Discussed JavaScript’s dominance in backend development, highlighting frameworks, asynchronous programming, and cross-platform capabilities.",
  },
];

export default speaking;
