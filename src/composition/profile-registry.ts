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
    skillVariant: "default" | "singapore";
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

export const profileRegistry: Record<ProfileId, ProfileConfiguration> = {
  default: {
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
  },
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
    id: "malaysia-backend",
    title: basics.title,
    description: "Backend engineering profile tailored for Malaysia.",
    summary: resumeSummary,
    basics: {
      ...basics,
      location:
        "Islamabad, Pakistan | Open to relocation (Malaysia) | Available for visa sponsorship",
    },
    includedSections: allSections,
    filters: {
      experienceVariant: "default",
      skillVariant: "default",
      resumeHighlightsOnly: true,
    },
  },
};

export function getProfile(profileId: ProfileId): ProfileConfiguration {
  return profileRegistry[profileId];
}
