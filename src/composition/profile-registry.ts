import { basics, resumeSummary } from "../data/summary";
import {
  basics as singaporeBasics,
  resumeSummary as singaporeSummary,
} from "../data/summary.sg";
import type { BasicsViewModel } from "./view-models";

export const profileIds = [
  "default",
  "singapore-backend",
  "malaysia-backend",
] as const;
export type ProfileId = (typeof profileIds)[number];

export type ProfileSection =
  | "experience"
  | "projects"
  | "publications"
  | "skills"
  | "education"
  | "certifications"
  | "achievements"
  | "speaking"
  | "interests";

export interface ProfileConfiguration {
  id: ProfileId;
  title: string;
  description: string;
  summary: string;
  basics: BasicsViewModel;
  includedSections: ProfileSection[];
  filters: {
    experienceVariant: "default" | "singapore";
    skillVariant: "default" | "singapore" | "malaysia";
    resumeHighlightsOnly: boolean;
  };
}

const allSections: ProfileSection[] = [
  "experience",
  "projects",
  "publications",
  "skills",
  "education",
  "certifications",
  "achievements",
  "speaking",
  "interests",
];

const generalProfile: ProfileConfiguration = {
  id: "default",
  title: basics.title,
  description: "Default backend engineering portfolio profile.",
  summary: resumeSummary,
  basics,
  includedSections: allSections,
  filters: {
    experienceVariant: "default",
    skillVariant: "default",
    resumeHighlightsOnly: true,
  },
};

const malaysiaOverrides = {
  id: "malaysia-backend",
  title: "Backend Engineer (Node.js)",
  description: "Backend engineering profile tailored for Malaysia.",
  summary: `
Backend Engineer with **5+ years of experience building scalable backend systems** for SaaS platforms and cloud-native applications. Strong expertise in **Node.js, RESTful APIs, production systems, and third-party integrations**, delivering secure and reliable services that support measurable business impact. Experienced in improving performance, reliability, discoverability, and customer workflows, with additional capability in **AI-powered applications and Retrieval-Augmented Generation (RAG)**.
`,
  basics: {
    title: "Backend Engineer (Node.js)",
    location:
      "Islamabad, Pakistan | Open to relocation (Malaysia) | Available for visa sponsorship",
  },
  filters: {
    skillVariant: "malaysia",
  },
} as const;

export const profileRegistry: Record<ProfileId, ProfileConfiguration> = {
  default: generalProfile,
  "singapore-backend": {
    id: "singapore-backend",
    title: singaporeBasics.title,
    description: "Backend engineering profile tailored for Singapore.",
    summary: singaporeSummary,
    basics: singaporeBasics,
    includedSections: allSections,
    filters: {
      experienceVariant: "singapore",
      skillVariant: "singapore",
      resumeHighlightsOnly: true,
    },
  },
  "malaysia-backend": {
    ...generalProfile,
    ...malaysiaOverrides,
    basics: {
      ...generalProfile.basics,
      ...malaysiaOverrides.basics,
    },
    filters: {
      ...generalProfile.filters,
      ...malaysiaOverrides.filters,
    },
  },
};

export function getProfile(profileId: ProfileId): ProfileConfiguration {
  return profileRegistry[profileId];
}
