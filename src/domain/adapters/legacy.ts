import experiencesSingapore from "../../data/experiences.sg";
import skillsSingapore from "../../data/skills.sg";
import { getAsset } from "../assets";
import {
  certifications as canonicalCertifications,
  education as canonicalEducation,
  experiences as canonicalExperiences,
  projects as canonicalProjects,
  publications as canonicalPublications,
  skills as canonicalSkills,
} from "../professional-data";

export const experiences = canonicalExperiences.map((item) => {
  const legacy = { ...item, logo: item.logoAssetId ? getAsset(item.logoAssetId).path : "" };
  delete legacy.id;
  delete legacy.logoAssetId;
  return legacy;
});

export const projects = Object.fromEntries(
  Object.entries(canonicalProjects).map(([category, items]) => [
    category,
    items.map((item) => {
      const legacy = { ...item };
      delete legacy.id;
      delete legacy.category;
      return legacy;
    }),
  ]),
) as typeof import("../../data/projects").projects;

export const skills = canonicalSkills.map((item) => {
  const legacy = { ...item };
  delete legacy.id;
  return legacy;
});
export const publications = canonicalPublications.map((item) => {
  const legacy = { ...item };
  delete legacy.id;
  return legacy;
});
export const education = canonicalEducation.map((item) => {
  const legacy = { ...item };
  delete legacy.id;
  return legacy;
});
export const certifications = canonicalCertifications.map((item) => {
  const legacy = {
    ...item,
    file: item.assetId ? getAsset(item.assetId).path : undefined,
  };
  delete legacy.id;
  delete legacy.assetId;
  return legacy;
});

// Temporary compatibility exports. These preserve the existing Singapore resume
// wording until profile selection is introduced in the next milestone.
export { experiencesSingapore, skillsSingapore };
