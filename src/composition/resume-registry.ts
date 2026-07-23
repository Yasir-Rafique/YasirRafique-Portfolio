import type { ProfileId } from "./profile-registry";

export const resumeIds = ["default", "singapore", "malaysia"] as const;
export type ResumeId = (typeof resumeIds)[number];

export interface ResumeConfiguration {
  id: ResumeId;
  title: string;
  profileId: ProfileId;
  outputFilename: string;
  metadata: {
    language: string;
    market: string;
  };
}

export const resumeRegistry: Record<ResumeId, ResumeConfiguration> = {
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
