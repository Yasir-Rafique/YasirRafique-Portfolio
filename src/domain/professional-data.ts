import { certifications as sourceCertifications } from "../data/certifications";
import { education as sourceEducation } from "../data/education";
import { experiences as sourceExperiences } from "../data/experiences";
import { projects as sourceProjects } from "../data/projects";
import { publications as sourcePublications } from "../data/publications";
import sourceSkills from "../data/skills";
import { getAsset } from "./assets";
import type {
  Certification,
  Education,
  Experience,
  Product,
  Project,
  Publication,
  Skill,
} from "./models";

const experienceIds = ["find-my-facility", "helply", "signator", "qjump"] as const;
export const experiences: Experience[] = sourceExperiences.map((item, index) => ({
  ...item,
  id: `experience.${experienceIds[index]}` as Experience["id"],
}));

const projectIds: Record<keyof typeof sourceProjects, Project["id"][]> = {
  Personal: ["project.scribelens", "project.tunnin"],
  Experience: [
    "project.find-my-facility",
    "project.helply",
    "project.signator",
  ],
  GitHub: [
    "project.rest-api-starter-kit",
    "project.toolbelt-js",
    "project.checkmate-contribution",
    "project.puter-contribution",
    "project.awesome-nodejs-contribution",
    "project.react-native-social-media-learning-app",
    "project.cinema-ticket-api",
  ],
};

export const projects: Record<keyof typeof sourceProjects, Project[]> =
  Object.fromEntries(
    Object.entries(sourceProjects).map(([category, items]) => [
      category,
      items.map((item, index) => ({
        ...item,
        id: projectIds[category as keyof typeof sourceProjects][index],
        category: category as Project["category"],
      })),
    ]),
  ) as Record<keyof typeof sourceProjects, Project[]>;

const productIds: Product["id"][] = [
  "product.find-my-facility",
  "product.helply",
  "product.signator",
];
export const products: Product[] = projects.Experience.map((project, index) => ({
  id: productIds[index],
  name: project.title,
  projectId: project.id,
}));

const skillIds: Skill["id"][] = [
  "skill.artificial-intelligence-and-llm-applications",
  "skill.web-and-backend-development",
  "skill.programming-and-software-development",
  "skill.software-architecture-and-development-practices",
  "skill.team-agile-collaboration-testing-and-debugging",
];
export const skills: Skill[] = sourceSkills.map((item, index) => ({
  ...item,
  id: skillIds[index],
}));

const publicationIds: Publication["id"][] = [
  "publication.lean-rag-mvps",
  "publication.prevent-data-loss-in-nodejs-cron-jobs",
  "publication.nodejs-memory-leaks-guide",
  "publication.taming-memory-leaks-conf42",
  "publication.ai-in-cybersecurity",
  "publication.javascript-frameworks-past-present-future",
  "publication.serverless-computing-2024",
  "publication.rise-of-typescript",
  "publication.vue-3-new-features",
];
export const publications: Publication[] = sourcePublications.map((item, index) => ({
  ...item,
  id: publicationIds[index],
}));

const educationIds: Education["id"][] = [
  "education.msc-computing-and-technology",
  "education.bs-computer-science",
];
export const education: Education[] = sourceEducation.map((item, index) => ({
  ...item,
  id: educationIds[index],
}));

const certificationAssetIds = [
  "asset.certification.ibm-ai",
  "asset.certification.react-native",
  undefined,
  "asset.certification.graphql",
  "asset.certification.aws-s3",
] as const;
const certificationIds: Certification["id"][] = [
  "certification.ibm-introduction-to-ai",
  "certification.udemy-react-native-mobile-development",
  "certification.digital-futures-software-engineering-basics",
  "certification.coursera-graphql-expressjs",
  "certification.coursera-aws-s3-basics",
  "certification.ielts-6-5",
  "certification.deans-honor-list",
  "certification.academic-excellence",
  "certification.tectiq-speed-programming",
  "certification.office-automation",
];

export const certifications: Certification[] = sourceCertifications.map(
  (item, index) => {
    const canonical: Certification & { file?: string } = {
      ...item,
      id: certificationIds[index],
      assetId: certificationAssetIds[index],
    };
    delete canonical.file;
    return canonical;
  },
);

// Resolve registered assets here so broken IDs fail at the data boundary.
certifications.forEach((item) => item.assetId && getAsset(item.assetId));
