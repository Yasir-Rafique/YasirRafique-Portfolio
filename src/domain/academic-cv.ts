import type { Education, Experience, Publication, Project, Skill } from "./models";
import type { BasicsViewModel } from "../composition/view-models";

export type CvLink = { label: string; href: string };
export type AcademicEducation = Education & {
  classification?: string;
  location?: string;
  thesis?: { label: string; title: string; result?: string };
};
export type ResearchExperience = Pick<Experience, "id" | "role" | "company" | "duration" | "description"> & {
  supervisor?: string;
  paragraphs?: string[];
};
export type ResearchOutput = Publication & { authors: string; year?: string; status?: string; doi?: CvLink };
export type AcademicProject = Project & { date?: string; bullets?: string[] };
export type AcademicContribution = {
  id: string;
  title: string;
  titleLink?: string;
  context?: string;
  date?: string;
  description?: string[];
  links?: CvLink[];
};
export interface AcademicCvData {
  basics: BasicsViewModel & { orcid?: string; contactLinks?: CvLink[] };
  researchProfile: string;
  researchInterests: string[];
  education: AcademicEducation[];
  researchExperience: ResearchExperience[];
  researchOutputs: { title: string; items: ResearchOutput[] }[];
  doctoralResearch?: { title: string; paragraphs: string[] };
  experiences: (Experience & { compact?: boolean })[];
  projects: AcademicProject[];
  talks: AcademicContribution[];
  writing: AcademicContribution[];
  openSource: AcademicContribution[];
  skills: Skill[];
  service: AcademicContribution[];
}
