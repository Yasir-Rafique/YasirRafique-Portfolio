import type { AcademicCvData } from "../domain/academic-cv";
import { academicCvPlaceholder } from "../data/academic-cv.placeholder";

export const academicSections = [
  ["researchProfile", "Research Profile"],
  ["researchInterests", "Research Interests"],
  ["education", "Education"],
  ["researchOutputs", "Research Outputs"],
  ["researchExperience", "Research Experience"],
  ["doctoralResearch", "Proposed Doctoral Research"],
  ["experiences", "Professional Software Engineering Experience"],
  ["contributions", "Selected Projects & Technical Contributions"],
  ["skills", "Research & Technical Skills"],
  ["service", "Honours, Mentoring & Service"],
] as const;
export type AcademicSectionId = (typeof academicSections)[number][0];
export interface AcademicCvViewModel {
  template: "phd-academic";
  resumeId: string;
  outputFilename: string;
  data: AcademicCvData;
  sections: { id: AcademicSectionId; title: string }[];
}

// Accept canonical records directly: later profiles select facts rather than copying them.
export function composeAcademicCv(
  outputFilename: string,
  order: readonly AcademicSectionId[],
  data: AcademicCvData = academicCvPlaceholder,
): AcademicCvViewModel {
  return {
    template: "phd-academic",
    resumeId: "phd-academic",
    outputFilename,
    data,
    sections: order
      .filter((id) => {
        if (id === "contributions")
          return [
            data.projects,
            data.talks,
            data.writing,
            data.openSource,
          ].some((items) => items.length);
        if (id === "doctoralResearch")
          return Boolean(
            data.doctoralResearch?.title ||
            data.doctoralResearch?.paragraphs.some((p) => p.trim()),
          );
        if (id === "researchOutputs")
          return data.researchOutputs.some((group) => group.items.length);
        if (id === "skills")
          return data.skills.some((group) =>
            group.items.some((item) => item.trim()),
          );
        const value = data[id];
        return typeof value === "string"
          ? Boolean(value.trim())
          : value.length > 0;
      })
      .map((id) => ({
        id,
        title: academicSections.find((section) => section[0] === id)![1],
      })),
  };
}
