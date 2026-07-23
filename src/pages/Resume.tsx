import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import ResumePDF from "../pdf/ResumePDF";
import ReactMarkdown from "react-markdown";

import { composeResume, type ResumeId } from "../composition";

export default function ResumeRoute({ resumeId }: { resumeId: ResumeId }) {
  const composed = composeResume(resumeId);
  const finalSummary = composed.summary;
  const finalBasics = composed.basics;
  const finalExperiences = composed.experiences;
  const finalSkills = composed.skills;
  const externalEducation = composed.education;
  const externalProjects = composed.projects;
  const publications = composed.publications;
  const certifications = composed.certifications;
  const achievements = composed.achievements;
  const speaking = composed.speaking;
  const interests = composed.interests;

  const experiencesToShow = finalExperiences;

  // filter secondary sections by showResume flag (only show if showResume === true)
  const {
    achievements: achievementsForResume,
    publications: publicationsForResume,
    speaking: speakingForResume,
    certifications: certificationsForResume,
  } = composed.resumeHighlights;

  const [isGenerating, setIsGenerating] = useState(false);

  // Generate the standard A4 PDF and trigger the download.
  const generateAndDownload = async () => {
    try {
      setIsGenerating(true);

      // Create the PDF document with the composed resume data.
      const doc = (
        <ResumePDF
          basics={finalBasics}
          summary={finalSummary}
          //highlights={r.highlights}
          skills={finalSkills}
          experiences={finalExperiences}
          education={externalEducation}
          projects={externalProjects}
          publications={publications}
          interests={interests}
          certifications={certifications}
          achievements={achievements}
          speaking={speaking}
        />
      );

      // Generate blob (react-pdf)
      const blob = await pdf(doc).toBlob();

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = composed.outputFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="resume-content" className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl bg-white p-6 shadow-lg print:shadow-none print:p-0 print:mx-0">
        {/* Header: name, title, quick links */}
        <header className="mb-4 text-center">
          <h1 className="text-3xl font-extrabold leading-tight">
            {finalBasics.name}
          </h1>
          <p className="text-base text-gray-700 mt-1">{finalBasics.title}</p>
        </header>

        {/* Download control */}
        <div className="flex justify-end gap-3 mb-3 print:hidden">
          <button
            onClick={generateAndDownload}
            disabled={isGenerating}
            aria-busy={isGenerating}
            className="flex items-center gap-2 px-3 py-1 border rounded-full text-xs"
          >
            <Download size={14} aria-hidden="true" />
            Download Resume
          </button>
        </div>

        {/* Single-column resume layout (PDF friendly) */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Summary + Portfolio highlights */}
          <section>
            <h3 className="uppercase text-sm tracking-widest text-gray-700 font-bold">
              Summary
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-800 text-justify">
              <ReactMarkdown components={{ p: "span" }}>
                {finalSummary}
              </ReactMarkdown>
            </p>

            {/* Portfolio highlights: show a couple of achievements & publications on resume */}
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">
                Portfolio highlights
              </h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {achievementsForResume.slice(0, 3).map((a, i) => (
                  <div key={`ach-${i}`} className="">
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-xs text-gray-600 italic">
                      {a.org} • {a.date}
                    </div>
                  </div>
                ))}

                {publicationsForResume.slice(0, 3).map((p, i) => (
                  <div key={`pub-${i}`} className="">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-600 italic">
                      {p.platform} • {p.date}
                    </div>
                  </div>
                ))}
                {certificationsForResume
                  .slice(0, 3)
                  .map((p, i) => (
                    <div key={`pub-${i}`} className="">
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs text-gray-600 italic">
                        • {p.date}
                      </div>
                    </div>
                  ))}
                {speakingForResume.slice(0, 3).map((p, i) => (
                  <div key={`pub-${i}`} className="">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-600 italic">
                      • {p.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* quick links row (GitHub / LinkedIn / Portfolio) */}
            <div className="mt-4 flex flex-wrap gap-3">
              {finalBasics.github && (
                <a
                  href={`${finalBasics.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  GitHub
                </a>
              )}
              {finalBasics.linkedin && (
                <a
                  href={`${finalBasics.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  LinkedIn
                </a>
              )}
              {finalBasics.portfolio && (
                <a
                  href={`${finalBasics.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  Portfolio
                </a>
              )}
              {finalBasics.email && (
                <a
                  href={`mailto:${finalBasics.email}`}
                  className="px-3 py-1 border rounded text-xs text-indigo-600 hover:bg-indigo-50"
                >
                  Email
                </a>
              )}
              {finalBasics.location && (
                <p className="px-3 py-1 border rounded text-xs text-indigo-60">
                  {finalBasics.location}
                </p>
              )}
              {finalBasics.phone && (
                <p className="px-3 py-1 border rounded text-xs text-indigo-60">
                  {finalBasics.phone}
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
                const role = e.role;
                const company = e.company;
                const location = e.location;
                const workType = e.workType;
                const duration = e.duration;
                const bullets = e.description;
                const stack = e.stack;

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
              {externalEducation.map(
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
                      {edu.start} – {edu.end}
                    </div>
                  </div>
                ),
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
              {finalSkills.map((group, idx) => (
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
