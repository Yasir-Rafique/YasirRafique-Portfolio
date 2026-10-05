import type { ProfileId } from "./profile-registry";
import { academicSections, type AcademicSectionId } from "./academic-cv";

export const resumeIds = ["default", "singapore", "malaysia", "phd-academic"] as const;
export type ResumeId = (typeof resumeIds)[number];
export type ProfessionalResumeId = Exclude<ResumeId, "phd-academic">;

export interface ProfessionalResumeConfiguration {
  id: ProfessionalResumeId;
  title: string;
  profileId: ProfileId;
  outputFilename: string;
  metadata: {
    language: string;
    market: string;
  };
}
export interface AcademicResumeConfiguration {
  id: "phd-academic";
  title: string;
  outputFilename: string;
  sectionOrder: readonly AcademicSectionId[];
  metadata: { language: string; market: string };
}
export type ResumeConfiguration = ProfessionalResumeConfiguration | AcademicResumeConfiguration;

export const resumeRegistry: Record<ResumeId, ResumeConfiguration> = {
  "phd-academic": {
    id: "phd-academic",
    title: "PhD Academic CV",
    outputFilename: "Muhammad Yasir Rafique - Academic CV.pdf",
    sectionOrder: academicSections.map(([id]) => id),
    metadata: { language: "en", market: "academic" },
  },
  default: {
    id: "default",
    title: "Default Backend Engineer Resume",
    profileId: "default",
    outputFilename: "Muhammad_Yasir_Rafique_Resume_V3.pdf",
    metadata: { language: "en", market: "global" },
  },
  singapore: {
    id: "singapore",
    title: "Singapore Backend Engineer Resume",
    profileId: "singapore-backend",
    outputFilename: "Muhammad_Yasir_Rafique_Singapore_Resume_V3.pdf",
    metadata: { language: "en", market: "singapore" },
  },
  malaysia: {
    id: "malaysia",
    title: "Malaysia Backend Engineer Resume",
    profileId: "malaysia-backend",
    outputFilename: "Muhammad_Yasir_Rafique_Malaysia_Resume_V3.pdf",
    metadata: { language: "en", market: "malaysia" },
  },
};

export function getResume(resumeId: ResumeId): ResumeConfiguration {
  return resumeRegistry[resumeId];
}
