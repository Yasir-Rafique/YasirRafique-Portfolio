import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "../pdf/ResumePDF";
import ReactMarkdown from "react-markdown";

import { experiences as externalExperiences } from "../data/experiences";
import { education as externalEducation } from "../data/education";
import { projects as externalProjects } from "../data/projects";
import skills from "../data/skills";
import speaking from "../data/speaking";
import { interests } from "../data/interests";
import { basics, resumeSummary } from "../data/summary";
import { latest } from "../data/latest";
import { certifications } from "../data/certifications";
import { achievements } from "../data/achievements";
import { publications } from "../data/publications";

type Basics = {
  name: string;
  title: string;
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
  phone?: string;
};

type ExternalExperience = {
  role?: string;
  company?: string;
  location?: string;
  workType?: string;
  duration?: string;
  description?: string[];
  stack?: string[];
  logo?: string;
  position?: string;
  start?: string;
  end?: string;
  bullets?: string[];
  technologies?: string[];
};

type Publication = {
  title: string;
  outlet?: string;
  date?: string;
  link?: string;
  showResume?: boolean;
};
type Speaking = {
  title: string;
  event: string;
  date?: string;
  note?: string;
  showResume?: boolean;
};
type Education = {
  degree: string;
  institution: string;
  years?: string;
  note?: string;
  start?: string;
  end?: string;
  details?: string[];
};

type SkillGroup = { heading: string; items: string[] };

type ResumeData = {
  basics: Basics;
  skillGroups: SkillGroup[];
  summary: string;
  highlights: string[];
  experiences?: ExternalExperience[];
  publications?: Publication[];
  speaking?: Speaking[];
  achievements?: any[];
  projects?: { name: string; description?: string }[];
  education?: Education[];
  additionalActivities?: string[];
  interests?: string[];
};

const sampleData: ResumeData = {
  basics,
  skillGroups: [],
  summary: resumeSummary.trim(),
  highlights: latest,
};

export default function ResumeRoute({ data }: { data?: Partial<ResumeData> }) {
  const r: ResumeData = {
    ...sampleData,
    ...(data ?? {}),
  } as ResumeData;

  const experiencesToShow: ExternalExperience[] = (
    externalExperiences && externalExperiences.length
      ? externalExperiences
      : r.experiences ?? []
  ) as ExternalExperience[];

  // filter secondary sections by showResume flag (only show if showResume === true)
  const achievementsForResume = (achievements || []).filter(
    (a: any) => a.showResume === true
  );
  const publicationsForResume = (publications || []).filter(
    (p: any) => p.showResume === true
  );
  const speakingForResume = (speaking || []).filter(
    (s: any) => s.showResume === true
  );
  const certificationsForResume = (certifications || []).filter(
    (c: any) => c.showResume === true
  );

  // modal + generator state
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // generate PDF and trigger download for chosen pageSize
  const generateAndDownload = async (pageSize: "A4" | "A3") => {
    try {
      setIsGenerating(true);

      // Create the PDF document element. ResumePDF should accept pageSize prop.
      const doc = (
        <ResumePDF
          basics={r.basics}
          summary={r.summary}
          //highlights={r.highlights}
          skills={skills}
          experiences={experiencesToShow}
          education={externalEducation}
          projects={externalProjects}
          publications={publications}
          interests={interests}
          certifications={certifications}
          achievements={achievements}
          speaking={speaking}
          pageSize={pageSize}
        />
      );

      // Generate blob (react-pdf)
      const blob = await pdf(doc).toBlob();

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Muhammad_Yasir_Rafique_latest_Resume_V3_${pageSize}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsGenerating(false);
      setShowModal(false);
    }
  };

  return (
    <div id="resume-content" className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl bg-white p-6 shadow-lg print:shadow-none print:p-0 print:mx-0">
        {/* Header: name, title, quick links */}
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-extrabold leading-tight">
            {r.basics.name}
          </h1>
          <p className="text-base text-gray-700 mt-1">{r.basics.title}</p>
        </header>

        {/* Controls (open modal) */}
        <div className="flex justify-end gap-3 mb-3 print:hidden">
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-1 border rounded-full text-xs"
          >
            Download PDF
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-5 w-[320px] max-w-full">
              <h3 className="text-lg font-semibold mb-3">Choose PDF format</h3>

              <p className="text-sm text-gray-600 mb-3">
                Pick layout (estimated pages):
              </p>

              <div className="space-y-3">
                <button
                  disabled={isGenerating}
                  onClick={() => generateAndDownload("A4")}
                  className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">A4</div>
                      <div className="text-xs text-gray-500">≈ 3 pages</div>
                    </div>
                    <div className="text-xs text-gray-500">Download</div>
                  </div>
                </button>

                <button
                  disabled={isGenerating}
                  onClick={() => generateAndDownload("A3")}
                  className="w-full text-left px-3 py-2 border rounded hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">A3</div>
                      <div className="text-xs text-gray-500">≈ 2 pages</div>
                    </div>
                    <div className="text-xs text-gray-500">Download</div>
                  </div>
                </button>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isGenerating}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  >
                    Cancel
                  </button>
                  <div className="flex-1">
                    {isGenerating && (
                      <div className="text-sm text-gray-600">
                        Preparing PDF…
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single-column resume layout (PDF friendly) */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Summary + Portfolio highlights */}
          <section>
            <h3 className="uppercase text-sm tracking-widest text-gray-700 font-bold">
              Summary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-800 text-justify">
              <ReactMarkdown components={{ p: "span" }}>
                {r.summary}
              </ReactMarkdown>
            </p>

            {/* Portfolio highlights: show a couple of achievements & publications on resume */}
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Portfolio highlights
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {achievementsForResume.slice(0, 3).map((a: any, i: number) => (
                  <div key={`ach-${i}`} className="">
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-xs text-gray-600 italic">
                      {a.org} • {a.date}
                    </div>
                  </div>
                ))}

                {publicationsForResume.slice(0, 3).map((p: any, i: number) => (
                  <div key={`pub-${i}`} className="">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-600 italic">
                      {p.platform || p.outlet} • {p.date}
                    </div>
                  </div>
                ))}
                {certificationsForResume
                  .slice(0, 3)
                  .map((p: any, i: number) => (
                    <div key={`pub-${i}`} className="">
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs text-gray-600 italic">
                        {p.platform || p.outlet} • {p.date}
                      </div>
                    </div>
                  ))}
                {speakingForResume.slice(0, 3).map((p: any, i: number) => (
                  <div key={`pub-${i}`} className="">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-600 italic">
                      {p.platform || p.outlet} • {p.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* quick links row (GitHub / LinkedIn / Portfolio) */}
            <div className="mt-4 flex flex-wrap gap-3">
              {r.basics.github && (
                <a
                  href={`${r.basics.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  GitHub
                </a>
              )}
              {r.basics.linkedin && (
                <a
                  href={`${r.basics.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  LinkedIn
                </a>
              )}
              {r.basics.portfolio && (
                <a
                  href={`${r.basics.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  Portfolio
                </a>
              )}
              {r.basics.email && (
                <a
                  href={`mailto:${r.basics.email}`}
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  Email
                </a>
              )}
              {r.basics.location && (
                <p className="px-3 py-1 border rounded text-xs text-indigo-60">
                  {r.basics.location}
                </p>
              )}
              {r.basics.phone && (
                <p className="px-3 py-1 border rounded text-xs text-indigo-60">
                  {r.basics.phone}
                </p>
              )}
            </div>
          </section>

          {/* Experience (main) */}
          <section>
            <h3 className="uppercase text-lg font-bold text-gray-700">
              Experience
            </h3>
            <div className="mt-3 space-y-6">
              {experiencesToShow.map((e, idx) => {
                const role = e.role ?? e.position ?? "";
                const company = e.company ?? "";
                const location = e.location ?? "";
                const workType = (e as any).workType ?? "";
                const duration =
                  (e as any).duration ??
                  ((e as any).start
                    ? `${(e as any).start}${
                        (e as any).end ? ` - ${(e as any).end}` : ""
                      }`
                    : "");
                const bullets = e.description ?? e.bullets ?? [];
                const stack = e.stack ?? e.technologies ?? [];

                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-medium text-sm">
                        {role} @ {company}
                      </div>
                      {duration && (
                        <div className="text-xs text-gray-600">{duration}</div>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                      {location}
                      {workType ? ` • ${workType}` : ""}
                    </div>

                    {bullets?.length ? (
                      <ul className="list-disc ml-5 mt-2 text-sm leading-tight space-y-1 text-justify">
                        {bullets.map((b, bi) => (
                          <li key={bi}>
                            <ReactMarkdown components={{ p: "span" }}>
                              {b}
                            </ReactMarkdown>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {stack?.length ? (
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>Tech:</strong>{" "}
                        <ReactMarkdown components={{ p: "span" }}>
                          {stack.join(", ")}
                        </ReactMarkdown>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Education (main) */}
          <section>
            <h3 className="uppercase text-lg font-bold text-gray-700">
              Education
            </h3>
            <div className="mt-3 space-y-4">
              {(externalEducation ?? sampleData.education ?? []).map(
                (edu, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <div>
                      <div className="font-medium text-sm">{edu.degree}</div>
                      <div className="text-xs text-gray-600">
                        {edu.institution}
                      </div>
                      {edu.details?.length ? (
                        <ul className="list-disc ml-5 mt-2 text-sm leading-tight space-y-1 text-justify">
                          {edu.details.map((d, di) => (
                            <li key={di}>
                              <ReactMarkdown components={{ p: "span" }}>
                                {d}
                              </ReactMarkdown>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <div className="text-xs text-gray-600 whitespace-nowrap">
                      {(edu as any).start} – {(edu as any).end}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Projects (main) */}
          <section>
            <h3 className="uppercase text-lg font-bold text-gray-700">
              Projects
            </h3>
            <div className="mt-3 space-y-4">
              {externalProjects.Personal.map((proj, idx) => (
                <div key={idx}>
                  <div className="font-medium text-sm">{proj.title}</div>
                  {proj.role && (
                    <div className="text-xs text-gray-600">{proj.role}</div>
                  )}
                  <p className="text-sm mt-1 leading-tight text-justify">
                    <ReactMarkdown components={{ p: "span" }}>
                      {proj.resumeBio}
                    </ReactMarkdown>
                  </p>
                  {proj.stack?.length && (
                    <div className="text-sm text-gray-600 mt-1">
                      <strong>Tech:</strong>{" "}
                      <ReactMarkdown components={{ p: "span" }}>
                        {proj.stack.join(", ")}
                      </ReactMarkdown>
                    </div>
                  )}
                  <div className="flex gap-3 mt-1 text-sm">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        Live
                      </a>
                    )}
                    {proj.source && (
                      <a
                        href={proj.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:underline"
                      >
                        Source
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Secondary: Skills, Achievements, Publications, Speaking, Certifications, Interests */}
          <section>
            <h3 className="uppercase text-lg font-bold text-gray-700">
              Skills
            </h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((group, idx) => (
                <div key={idx}>
                  <div className="font-semibold text-sm text-indigo-600">
                    {group.heading}
                  </div>
                  <ul className="list-disc ml-5 mt-1 text-sm leading-tight space-y-1 ">
                    {group.items.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {interests.length > 0 && (
            <section>
              <h3 className="uppercase text-lg font-bold text-gray-700">
                Interests
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {interests.map((i, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="font-semibold">{i.title}</div>
                    <div className="text-xs text-gray-600">{i.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
