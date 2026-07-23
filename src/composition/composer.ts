import { achievements } from "../data/achievements";
import experiencesSingapore from "../data/experiences.sg";
import { interests } from "../data/interests";
import { latest } from "../data/latest";
import skillsSingapore from "../data/skills.sg";
import speaking from "../data/speaking";
import { techStack } from "../data/techStack";
import { assets, getAsset, testimonialAvatarPaths } from "../domain/assets";
import {
  certifications as canonicalCertifications,
  education as canonicalEducation,
  experiences as canonicalExperiences,
  projects as canonicalProjects,
  publications as canonicalPublications,
  skills as canonicalSkills,
} from "../domain/professional-data";
import { getProfile, type ProfileId } from "./profile-registry";
import { getResume, type ResumeId } from "./resume-registry";
import type {
  CertificationViewModel,
  ExperienceViewModel,
  PortfolioViewModel,
  ProjectViewModel,
  ProjectsViewModel,
  ResumeViewModel,
} from "./view-models";

const experiences: ExperienceViewModel[] = canonicalExperiences.map((item) => ({
  role: item.role,
  company: item.company,
  location: item.location,
  workType: item.workType,
  duration: item.duration,
  description: item.description,
  stack: item.stack,
  logo: item.logoAssetId ? getAsset(item.logoAssetId).path : "",
}));

const singaporeExperiences: ExperienceViewModel[] = experiencesSingapore.map(
  (item) => ({ ...item }),
);

const projects = Object.fromEntries(
  Object.entries(canonicalProjects).map(([category, items]) => [
    category,
    items.map<ProjectViewModel>((item) => ({
      title: item.title,
      role: item.role,
      description: item.description,
      resumeBio: item.resumeBio,
      stack: item.stack,
      live: item.live,
      source: item.source,
    })),
  ]),
) as ProjectsViewModel;

const publications = canonicalPublications.map((item) => ({
  title: item.title,
  platform: item.platform,
  date: item.date,
  description: item.description,
  link: item.link,
  showResume: item.showResume,
}));

const skills = canonicalSkills.map((item) => ({
  heading: item.heading,
  items: item.items,
}));

const education = canonicalEducation.map((item) => ({
  start: item.start,
  end: item.end,
  degree: item.degree,
  institution: item.institution,
  details: item.details,
}));

const certifications: CertificationViewModel[] = canonicalCertifications.map(
  (item) => ({
    title: item.title,
    issuer: item.issuer,
    date: item.date,
    credentialId: item.credentialId,
    skills: item.skills,
    link: item.link,
    file: item.assetId ? getAsset(item.assetId).path : undefined,
    showResume: item.showResume,
  }),
);

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
        ? singaporeExperiences
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
    interests: includes("interests") ? interests : [],
    latest,
    techStack,
    profileImage: { src: assets.profile.path, alt: assets.profile.alt },
    testimonialAvatarPaths,
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
      achievements: included(portfolio.achievements),
      publications: included(portfolio.publications),
      certifications: included(portfolio.certifications),
      speaking: included(portfolio.speaking),
    },
  };
}

export function composeResumeFromSearch(search: string): ResumeViewModel {
  const market = new URLSearchParams(search).get("market");
  const resumeId: ResumeId =
    market === "sg" ? "singapore" : market === "malaysia" ? "malaysia" : "default";
  return composeResume(resumeId);
}
