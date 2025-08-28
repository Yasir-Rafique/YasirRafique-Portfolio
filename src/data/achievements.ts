// src/data/achievements.ts

export type Proof =
  | { type: "link"; url: string; label?: string }
  | { type: "image"; url: string; label?: string };

export type Achievement = {
  title: string;
  org?: string;
  date?: string;
  description: string[];
  tags?: string[];
  proofs?: Proof[];
};

export const achievements: Achievement[] = [
  {
    title: "OpenActive implementation impact on FindMyFacility (FMF)",
    org: "Find My Facility (FMF)",
    date: "2025",
    description: [
      "Implemented OpenActive standard across FMF to improve session discoverability.",
      "Resulted in increased visitors and client signups (graph available)",
      "Driving a 350%+ growth to new visitor sessions, with 87% direct traffic, 9% organic search, and 4% social engagement",
    ],
    tags: ["OpenActive", "API", "Impact"],
    proofs: [
      {
        type: "image",
        url: "/achievements/FMF-growth.png",
        label: "Visitor & client growth (graph screenshot)",
      },
    ],
  },
  {
    title: "5 GitHub achievements during Open-source contributions",
    org: "GitHub",
    date: "Ongoing",
    description: [
      "Completed five notable contributions across multiple repositories (issues, PRs and small libraries).",
      "Contributions include docs, bug fixes and feature PRs.",
    ],
    tags: ["Open Source", "GitHub"],
    proofs: [
      {
        type: "link",
        url: "https://github.com/Yasir-Rafique",
        label: "Checkout my GitHub profile",
      },
      {
        type: "image",
        url: "/achievements/GitHub-Achievements.png",
        label: "GitHub Achievements (screenshot)",
      },
    ],
  },
  {
    title:
      "Article featured on DZone 'JavaScript Frameworks: The Past, the Present, and the Future'",
    org: "DZone",
    date: "2024",
    description: [
      "Article published and featured on DZone.",
      "Received an editor comment on LinkedIn and an official feature email.",
    ],
    tags: ["Writing", "JavaScript"],
    proofs: [
      {
        type: "image",
        url: "/achievements/dzone-feature-email.jpg",
        label: "Feature email (screenshot)",
      },
      {
        type: "image",
        url: "/achievements/dzone-editor-comment.png",
        label: "Editor comment on LinkedIn (screenshot)",
      },
      {
        type: "link",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7230288958084059138?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7230288958084059138%2C7230301637783760896%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287230301637783760896%2Curn%3Ali%3Aactivity%3A7230288958084059138%29",
        label: "DZone editor comment",
      },
      {
        type: "link",
        url: "https://dzone.com/articles/javascript-frameworks-past-present-and-future",
        label: "Read article on DZone",
      },
    ],
  },
  {
    title:
      "Talk recognized by Tech Talk Weekly 'Taming Memory Leaks in Node.js: A Deep Dive | Conf42 JS 2024'",
    org: "Conf42 JS / Tech Talk Weekly",
    date: "2024",
    description: [
      "Presented an in-depth talk on diagnosing and fixing memory leaks in Node.js.",
      "Talk was highlighted/recognized by Tech Talk Weekly.",
    ],
    tags: ["Node.js", "Performance", "Talk"],
    proofs: [
      {
        type: "link",
        url: "https://www.linkedin.com/posts/yasir-rafique_your-website-does-not-need-javascript-amy-activity-7259245084087316481-zeza?utm_source=share&utm_medium=member_desktop&rcm=ACoAACPu2bkBcIJXVEzaetMKe3bwPwSNSXMHg88",
        label: "Tech Talk Weekly recognition (LinkedIn)",
      },
      {
        type: "link",
        url: "https://www.youtube.com/watch?v=A1zbvng3KtM",
        label: "My Talk on YouTube",
      },
      {
        type: "image",
        url: "/achievements/C42_Banner.png",
        label: "Feature email (screenshot)",
      },
      {
        type: "image",
        url: "/achievements/Conf42-talk-banner.png",
        label: "MY Talk Banner (screenshot)",
      },
    ],
  },
];
