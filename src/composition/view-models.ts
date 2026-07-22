import type { Achievement } from "../data/achievements";
import type { Certification } from "../data/certifications";
import type { Speaking } from "../data/speaking";
import type { Publications } from "../data/publications";
import type {
  certifications,
  education,
  experiences,
  projects,
  publications,
  skills,
} from "../domain/adapters/legacy";

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

export type ExperienceViewModel = (typeof experiences)[number];
export type ProjectsViewModel = typeof projects;
export type SkillGroupViewModel = (typeof skills)[number];
export type PublicationViewModel = (typeof publications)[number];
export type EducationViewModel = (typeof education)[number];
export type CertificationViewModel = (typeof certifications)[number];

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
  achievements: Achievement[];
  speaking: Speaking[];
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
    achievements: Achievement[];
    publications: Publications[];
    certifications: Certification[];
    speaking: Speaking[];
  };
}
