import type { AcademicCvData } from "../domain/academic-cv";
import { projects, publications } from "../domain/professional-data";

// Reuse only links already recorded in the canonical system.
const publicationLink = (id: string) =>
  publications.find((item) => item.id === id)?.link;
const contributionLinks = [
  ["project.checkmate-contribution", "Checkmate"],
  ["project.puter-contribution", "Puter"],
  ["project.awesome-nodejs-contribution", "Awesome NodeJS"],
].flatMap(([id, label], index) => {
  const href = projects.GitHub.find((item) => item.id === id)?.source;
  return href ? [{ label: `${index > 0 ? " · " : ""}${label}`, href }] : [];
});

export const academicCvPlaceholder: AcademicCvData = {
  basics: {
    name: "Muhammad Yasir Rafique",
    title: "Software Engineer | Independent Researcher",
    location: "Islamabad, Pakistan",
    contactLinks: [
      {
        label: "Yasirrafique223@gmail.com",
        href: "mailto:Yasirrafique223@gmail.com",
      },
      {
        label: "ORCID - 0009-0002-7373-2002",
        href: "https://orcid.org/0009-0002-7373-2002",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/yasir-rafique/",
      },
      {
        label: "GitHub",
        href: "https://www.github.com/Yasir-Rafique",
      },
      {
        label: "Portfolio",
        href: "https://yasirrafique-portfolio.netlify.app/",
      },
    ],
  },
  researchProfile:
    "Software engineer and independent researcher with 6+ years of professional experience designing and developing production software systems. Research experience includes controlled empirical evaluation of Retrieval-Augmented Generation architectures, with a sole-authored manuscript submitted to ECIR 2027 and under review, alongside prior MSc and undergraduate research projects. Research interests centre on software engineering, autonomous and AI-assisted software engineering, empirical evaluation, and assurance of AI-enabled systems.",
  researchInterests: [
    "Software Engineering",
    "Autonomous & AI-Assisted Software Engineering",
    "Empirical Software Engineering",
    "AI Assurance",
    "Privacy-Aware Autonomous Systems",
    "Retrieval-Augmented Generation.",
  ],
  education: [
    {
      id: "education.msc-computing-and-technology",
      degree: "Master of Science in Computing and Technology",
      classification: "Commendation, 67%",
      institution: "Northumbria University, London Campus, UK",
      start: "Sep 2021",
      end: "Nov 2022",
      thesis: {
        label: "Research & Development Project",
        title:
          "MenuLive Ordering System — QR-Based Real-Time Ordering and Service Management for Hotels and Restaurants",
        result: "70%",
      },
      details: [],
    },
    {
      id: "education.bs-computer-science",
      degree: "Bachelor of Science in Computer Science",
      classification: "CGPA 3.42/4.00",
      institution: "Abasyn University, Islamabad Campus",
      start: "Jan 2016",
      end: "Jan 2020",
      thesis: {
        label: "Final-Year Thesis",
        title: "Personalized Event Recommender System",
      },
      details: [],
    },
  ],
  researchExperience: [
    {
      id: "experience.independent-rag-research",
      role: "Independent Researcher — Controlled Evaluation of Retrieval-Augmented Generation Architectures",
      company: "Independent Research",
      duration: "Jul 2026–Sep 2026",
      description: [
        "Designed and conducted a controlled empirical study evaluating progressively more complex Retrieval-Augmented Generation architectures across human-verified answer quality, retrieval effectiveness, operational efficiency and engineering effort.",
        "Constructed a 100-question evaluation benchmark from 42 publicly accessible institutional sources and conducted 1,200 controlled experimental runs, supplemented by operational and maintenance evaluations.",
        "Applied controlled experimental design, human evaluation and statistical analysis, including bootstrap methods, hypothesis testing, multiple-comparison correction, sensitivity analysis and inter-rater reliability assessment.",
        "Prepared versioned reproducibility artifacts covering benchmark specifications, experimental configurations, execution records, statistical procedures and source provenance.",
      ],
    },
    {
      id: "experience.msc-menulive-research",
      role: "MSc Dissertation Project — MenuLive Ordering System",
      company: "Northumbria University",
      duration: "2022",
      description: [
        "Conducted an individual research-and-development project examining QR-based digital ordering and hospitality-service workflows through literature review, requirements analysis, methodology development and research-informed system design.",
        "Designed, implemented and functionally evaluated a multi-role web application using Node.js, Express.js, JavaScript and MongoDB, and produced the complete MSc dissertation under academic supervision.",
      ],
    },
    {
      id: "experience.undergraduate-recommender-research",
      role: "Undergraduate Thesis — Personalized Event Recommender System",
      company: "Abasyn University",
      duration: "2019",
      supervisor: "Naveen Ahmad",
      description: [
        "Conducted background research and literature review on personalized recommender systems and contributed to formulating the research problem and technical design.",
        "Led system design, implementation and thesis preparation for the joint final-year project, developing the web-based system using Python, Django and MySQL.",
      ],
      // Optional joint-project note omitted: the supplied bullets already state
      // the joint context and responsibilities, and the full CV exceeds two pages.
    },
  ],
  researchOutputs: [
    {
      title: "Manuscripts Under Review",
      items: [
        {
          id: "publication.rag-architecture-manuscript",
          authors: "Muhammad Yasir Rafique",
          title:
            "Choosing the Right RAG Architecture for Knowledge Assistants: A Controlled Study of Quality, Efficiency, and Engineering Cost",
          platform:
            "Manuscript submitted to the European Conference on Information Retrieval (ECIR 2027)",
          status: "Under review",
          description: "",
        },
      ],
    },
  ],
  doctoralResearch: {
    title:
      "Loss and Restoration of Completion Assurance in Autonomous Software Engineering: Late Privacy Discovery and Post-Remediation Supportability",
    paragraphs: [
      "Proposed doctoral research investigating how completion claims made by autonomous software-engineering agents can lose justified support when privacy obligations or inadmissible information use are discovered after task completion, and under what conditions those claims can legitimately become supportable again following remediation.",
      "The proposed research combines empirical software-engineering studies, controlled privacy-sensitive scenarios, assurance-impact analysis and post-remediation evaluation.",
    ],
  },
  experiences: [
    {
      id: "experience.find-my-facility",
      role: "Senior Web Backend Developer",
      company: "Find My Facility",
      duration: "Jan 2024–Present",
      location: "Remote, UK",
      workType: "",
      stack: [],
      description: [
        "Lead backend development and architectural evolution of a production sports and facility platform, including API design, relational data modelling and service integration.",
        "Designed and implemented integrations across payment, scheduling and open-data ecosystems, including Stripe Connect, OpenActive and external service providers.",
        "Manage backend deployment and AWS infrastructure while contributing to production reliability, maintainability and ongoing architectural modernization.",
      ],
    },
    {
      id: "experience.helply",
      role: "Web Backend Developer",
      company: "Helply",
      duration: "Jan 2023–Dec 2023",
      location: "Remote, UAE",
      workType: "",
      stack: [],
      description: [
        "Developed and maintained modular backend services for a digital healthcare platform using Node.js, Express.js and MongoDB.",
        "Designed APIs and integrated external payment and real-time communication services while contributing to backend performance and technical documentation.",
      ],
    },
    {
      id: "experience.signator",
      role: "Web Backend Developer",
      company: "Signator",
      duration: "Jan 2021–Dec 2022",
      location: "Remote, UAE",
      workType: "",
      stack: [],
      description: [
        "Developed backend services for an AI-enabled résumé and portfolio platform, including user profiling, structured data management, API design and automated document generation.",
        "Contributed to AI-assisted customization functionality and data-management workflows with attention to privacy and data protection.",
      ],
    },
    {
      id: "experience.qjump",
      role: "Full-Stack Developer",
      company: "QJump",
      duration: "Jul 2020–Dec 2020",
      location: "Remote, UAE",
      workType: "",
      stack: [],
      compact: true,
      description: [
        "Developed and maintained Node.js-based web application functionality across backend and frontend components.",
      ],
    },
  ],
  projects: [
    {
      id: "project.scribelens",
      category: "Personal",
      title: "ScribeLens — Retrieval-Augmented Generation Knowledge Assistant",
      role: "",
      date: "2025–Present",
      description: "",
      bullets: [
        "Developed an initial document-grounded RAG knowledge assistant for context-grounded question answering; architectural questions encountered during development directly motivated the subsequent controlled RAG architecture study submitted to ECIR 2027.",
        "Currently extending ScribeLens toward a broader institutional knowledge-assistant system, applying lessons from the empirical RAG architecture study.",
      ],
      stack: [],
      live: "",
      source: "",
    },
  ],
  talks: [
    {
      id: "talk.taming-memory-leaks-conf42",
      title: "“Taming Memory Leaks in Node.js: A Deep Dive.”",
      titleLink: publicationLink("publication.taming-memory-leaks-conf42"),
      context: "Conf42 JS",
      date: "2024",
      description: ["Subsequently highlighted by Tech Talk Weekly."],
    },
  ],
  writing: [
    {
      id: "writing.lean-rag-mvps",
      title:
        "“Lean RAG MVPs: How to Build Retrieval-Augmented Tools Without Heavy Infrastructure.”",
      titleLink: publicationLink("publication.lean-rag-mvps"),
      context: "DEV Community",
      date: "2025",
    },
    {
      id: "writing.javascript-frameworks",
      title: "“JavaScript Frameworks: The Past, the Present, and the Future.”",
      titleLink: publicationLink(
        "publication.javascript-frameworks-past-present-future",
      ),
      context: "DZone",
      date: "2024",
      description: ["Featured by DZone."],
    },
  ],
  openSource: [
    {
      id: "opensource.merged-contributions",
      title: "Open-Source Contributor:",
      description: [
        "Merged contributions to Checkmate, Puter and Awesome NodeJS, spanning validation logic, development configuration and UI/documentation improvements.",
      ],
      links: contributionLinks,
    },
  ],
  skills: [
    {
      id: "skill.research-methods",
      heading: "Research Methods",
      items: [
        "Literature review",
        "research-question formulation",
        "controlled experimental design",
        "benchmark design",
        "quantitative evaluation",
        "human evaluation and annotation",
        "inter-rater reliability assessment",
        "statistical hypothesis testing",
        "bootstrap analysis",
        "sensitivity analysis",
        "reproducibility planning",
        "academic research writing.",
      ],
    },
    {
      id: "skill.academic-technical",
      heading: "Technical Skills",
      items: [
        "Node.js",
        "TypeScript/JavaScript",
        "Express.js",
        "PostgreSQL/MySQL",
        "MongoDB",
        "Python",
        "AWS",
        "REST API design",
        "relational data modelling",
        "system integration",
        "AI/LLM application development",
        "Retrieval-Augmented Generation",
        "Git",
        "data visualization.",
      ],
    },
    {
      id: "skill.research-tools",
      heading: "Research Tools",
      items: ["LaTeX", "Zotero."],
    },
  ],
  service: [
    {
      id: "service.deans-list",
      title: "Dean's List of Honour for Academic Excellence",
      context: "Abasyn University",
      date: "2016, 2018, 2019",
    },
    {
      id: "service.codingcoach",
      title: "Volunteer Mentor",
      context: "CodingCoach",
      date: "2025–2026",
      description: [
        "Provided one-to-one software-development mentoring to three mentees through the CodingCoach community.",
      ],
    },
    {
      id: "service.ansec",
      title: "Organizer",
      context: "Abasyn National Science & Engineering Competition (ANSEC)",
      date: "2017, 2018, 2019",
    },
  ],
};
