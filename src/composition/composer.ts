import { achievements } from "../data/achievements";
import speaking from "../data/speaking";
import {
  certifications,
  education,
  experiences,
  experiencesSingapore,
  projects,
  publications,
  skills,
  skillsSingapore,
} from "../domain/adapters/legacy";
import { getProfile, type ProfileId } from "./profile-registry";
import { getResume, type ResumeId } from "./resume-registry";
import type { PortfolioViewModel, ResumeViewModel } from "./view-models";

export function composePortfolio(profileId: ProfileId = "default"): PortfolioViewModel {
  const profile = getProfile(profileId);
  const includes = (section: (typeof profile.includedSections)[number]) =>
    profile.includedSections.includes(section);

  return {
    profileId: profile.id,
    title: profile.title,
    description: profile.description,
    summary: profile.summary,
    experiences: !includes("experience")
      ? []
      : profile.filters.experienceVariant === "singapore"
        ? experiencesSingapore
        : experiences,
    projects: includes("projects")
      ? projects
      : { Personal: [], Experience: [], GitHub: [] },
    publications: includes("publications") ? publications : [],
    skills: !includes("skills")
      ? []
      : profile.filters.skillVariant === "singapore"
        ? skillsSingapore
        : skills,
    education: includes("education") ? education : [],
    certifications: includes("certifications") ? certifications : [],
    achievements: includes("achievements") ? achievements : [],
    speaking: includes("speaking") ? speaking : [],
  };
}

export function composeResume(resumeId: ResumeId = "default"): ResumeViewModel {
  const resume = getResume(resumeId);
  const profile = getProfile(resume.profileId);
  const portfolio = composePortfolio(profile.id);
  const onlyResumeHighlights = profile.filters.resumeHighlightsOnly;
  const included = <Item extends { showResume?: boolean }>(items: Item[]) =>
    onlyResumeHighlights ? items.filter((item) => item.showResume === true) : items;

  return {
    ...portfolio,
    resumeId: resume.id,
    outputFilename: resume.outputFilename,
    metadata: resume.metadata,
    basics: profile.basics,
    resumeHighlights: {
      achievements: profile.includedSections.includes("achievements")
        ? included(achievements)
        : [],
      publications: included(publications),
      certifications: included(certifications),
      speaking: profile.includedSections.includes("speaking")
        ? included(speaking)
        : [],
    },
  };
}
