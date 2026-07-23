import type {
  Certification,
  Education,
  Experience,
  Project,
  Publication,
  Skill,
} from "../domain/models";
import type { techStack as sourceTechStack } from "../data/techStack";

export type BasicsViewModel = {
  name: string;
  title: string;
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
  phone?: string;
};

export type ExperienceViewModel = Omit<Experience, "id" | "logoAssetId"> & {
  logo: string;
};
export type ProjectViewModel = Omit<Project, "id" | "category">;
export type ProjectsViewModel = Record<Project["category"], ProjectViewModel[]>;
export type SkillGroupViewModel = Omit<Skill, "id">;
export type PublicationViewModel = Omit<Publication, "id">;
export type EducationViewModel = Omit<Education, "id">;
export type CertificationViewModel = Omit<Certification, "id" | "assetId"> & {
  file?: string;
};

export type AchievementViewModel = {
  title: string;
  org?: string;
  date?: string;
  description: string[];
  tags?: string[];
  proofs?: Array<{
    type: "link" | "image";
    url: string;
    label?: string;
  }>;
  showResume?: boolean;
};

export type SpeakingViewModel = {
  title: string;
  event: string;
  date: string;
  description: string;
  showResume?: boolean;
};

export type InterestViewModel = {
  title: string;
  description: string;
};

export type TechStackViewModel = typeof sourceTechStack;

export interface PortfolioViewModel {
  profileId: string;
  title: string;
  description: string;
  summary: string;
  experiences: ExperienceViewModel[];
  projects: ProjectsViewModel;
  publications: PublicationViewModel[];
  skills: SkillGroupViewModel[];
  education: EducationViewModel[];
  certifications: CertificationViewModel[];
  achievements: AchievementViewModel[];
  speaking: SpeakingViewModel[];
  interests: InterestViewModel[];
  latest: string[];
  techStack: TechStackViewModel;
  profileImage: { src: string; alt: string };
  testimonialAvatarPaths: string[];
}

export interface ResumeViewModel extends PortfolioViewModel {
  resumeId: string;
  outputFilename: string;
  metadata: {
    language: string;
    market: string;
  };
  basics: BasicsViewModel;
  resumeHighlights: {
    achievements: AchievementViewModel[];
    publications: PublicationViewModel[];
    certifications: CertificationViewModel[];
    speaking: SpeakingViewModel[];
  };
}
