// Run via esbuild (already provided by Vite); see docs/academic-cv.md.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { renderToFile } from "@react-pdf/renderer";
import { academicCvPlaceholder } from "../src/data/academic-cv.placeholder";
import { academicSections, composeAcademicCv } from "../src/composition/academic-cv";
import AcademicCvPDF from "../src/pdf/AcademicCvPDF";
import { registerAcademicFonts } from "../src/pdf/academic-styles";

registerAcademicFonts(resolve("public/fonts/source-serif-4"));
const order = academicSections.map(([id]) => id);
const model = composeAcademicCv("PhD_Academic_CV_Template.pdf", order);
assert.equal(model.sections.length, 10);
assert.equal(model.data, academicCvPlaceholder);
const empty = { ...academicCvPlaceholder, researchProfile: " ", researchInterests: [], education: [], researchExperience: [], researchOutputs: [{ title: "Empty", items: [] }], doctoralResearch: undefined, experiences: [], projects: [], talks: [], writing: [], openSource: [], skills: [], service: [] };
assert.deepEqual(composeAcademicCv("empty.pdf", order, empty).sections, []);
assert.deepEqual(composeAcademicCv("reordered.pdf", ["skills", "education"]).sections.map(s => s.id), ["skills", "education"]);
await mkdir("artifacts", { recursive: true });
await renderToFile(<AcademicCvPDF model={model} />, "artifacts/PhD_Academic_CV_Template.pdf");
// Deliberately long content verifies that flowing entries can exceed a page.
const overflow = structuredClone(academicCvPlaceholder);
overflow.researchExperience[0].paragraphs = Array.from({ length: 24 }, (_, i) => `[Long research paragraph ${i + 1}: research question, methodology, evidence and limitations. This placeholder exercises natural page flow and continued supporting text.]`);
await renderToFile(<AcademicCvPDF model={composeAcademicCv("overflow.pdf", order, overflow)} />, "artifacts/academic-overflow.pdf");
console.log("Composition assertions passed; template and overflow PDFs rendered.");
