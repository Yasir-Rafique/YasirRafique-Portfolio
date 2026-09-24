import { Fragment, type ReactNode, type ComponentProps } from "react";
import { Document, Page, Text as PdfText, View, Link } from "@react-pdf/renderer";
import type {
  AcademicCvViewModel,
  AcademicSectionId,
} from "../composition/academic-cv";
import type {
  AcademicContribution,
  AcademicEducation,
  CvLink,
  ResearchOutput,
} from "../domain/academic-cv";
import { academicStyles as s } from "./academic-styles";

// Scoped to the academic document; other CV renderers retain their own wrapping.
const wholeWords = (word: string) => [word];
function Text(props: ComponentProps<typeof PdfText>) {
  return <PdfText {...props} hyphenationCallback={wholeWords} />;
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <Text style={s.paragraph} orphans={2} widows={2}>
      {children}
    </Text>
  );
}
function Links({ links }: { links?: CvLink[] }) {
  return links?.length ? (
    <Text style={s.metadata}>
      {links.map((link, i) => (
        <Text key={link.href}>
          {i > 0 ? " · " : ""}
          <Link src={link.href} style={s.link}>
            {link.label}
          </Link>
        </Text>
      ))}
    </Text>
  ) : null;
}
function AcademicEntry({
  title,
  date,
  dateWidth,
  context,
  location,
  children,
  compact = false,
  short = false,
}: {
  title: ReactNode;
  date?: string;
  dateWidth?: number;
  context?: string;
  location?: string;
  children?: ReactNode;
  compact?: boolean;
  short?: boolean;
}) {
  return (
    <View style={compact ? s.compact : s.entry} wrap={!short}>
      <View wrap={false} minPresenceAhead={28}>
        <View style={s.row}>
          <Text style={[s.primary, s.title]}>{title}</Text>
          {date && (
            <Text style={dateWidth ? [s.date, { width: dateWidth }] : s.date}>
              {date}
            </Text>
          )}
        </View>
        {(context || location) && (
          <View style={s.row}>
            <Text style={[s.primary, s.metadata]}>{context}</Text>
            {location && <Text style={s.date}>{location}</Text>}
          </View>
        )}
      </View>
      {children}
    </View>
  );
}
function Bullets({ items }: { items: string[] }) {
  return items.map((item, i) => (
    <View key={i} style={s.bullet} wrap={false}>
      <Text style={s.bulletMark}>•</Text>
      <Text style={s.bulletText} orphans={2} widows={2}>
        {item}
      </Text>
    </View>
  ));
}
function EducationEntry({ item }: { item: AcademicEducation }) {
  return (
    <AcademicEntry
      title={[item.degree, item.classification].filter(Boolean).join(" — ")}
      date={[item.start, item.end].filter(Boolean).join("–")}
      context={item.institution}
      location={item.location}
      short={item.details.join(" ").length < 300}
    >
      {item.thesis && (
        <Paragraph>
          {item.thesis.label}: {item.thesis.title}
          {item.thesis.result ? ` (${item.thesis.result})` : ""}
        </Paragraph>
      )}
      {item.details.map((detail, i) => (
        <Paragraph key={i}>{detail}</Paragraph>
      ))}
    </AcademicEntry>
  );
}
function PublicationEntry({ item }: { item: ResearchOutput }) {
  return (
    <Text style={s.citation} orphans={2} widows={2}>
      {item.authors}
      {item.year ? ` (${item.year})` : ""}. {item.title}.{" "}
      <Text style={s.italic}>{item.platform}</Text>
      {item.status ? `. ${item.status}` : ""}.
      {item.doi ? (
        <>
          {" "}
          <Link src={item.doi.href} style={s.link}>
            {item.doi.label}
          </Link>
        </>
      ) : item.link ? (
        <>
          {" "}
          <Link src={item.link} style={s.link}>
            Paper
          </Link>
        </>
      ) : null}
    </Text>
  );
}
function CompactContributionEntry({
  item,
  projectLinks = false,
}: {
  item: AcademicContribution;
  projectLinks?: boolean;
}) {
  return (
    <AcademicEntry
      title={
        projectLinks ? (
          item.links?.map((link, i) => (
            <Text key={link.href}>
              {i > 0 ? " · " : ""}
              <Link src={link.href} style={s.contributionLink}>
                {link.label.replace(/^\s*·\s*/, "")}
              </Link>
            </Text>
          ))
        ) : item.titleLink ? (
          <Link src={item.titleLink} style={s.contributionLink}>
            {item.title}
          </Link>
        ) : (
          item.title
        )
      }
      date={
        projectLinks
          ? undefined
          : [item.context, item.date].filter(Boolean).join(" · ")
      }
      dateWidth={120}
      compact
      short={(item.description?.join(" ").length ?? 0) < 300}
    >
      {!projectLinks && Boolean(item.links?.length) && (
        <Text style={s.metadata}>
          {item.links?.map((link, i) => (
            <Text key={link.href}>
              {i > 0 ? " · " : ""}
              <Link src={link.href} style={s.contributionLink}>
                {link.label}
              </Link>
            </Text>
          ))}
        </Text>
      )}
      {item.description?.map((p, i) => (
        <Paragraph key={i}>{p}</Paragraph>
      ))}
    </AcademicEntry>
  );
}
function Subsection({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <>
      <View wrap={false} minPresenceAhead={48}>
        <Text style={compact ? s.contributionSubsection : s.subsection}>
          {title}
        </Text>
      </View>
      {children}
    </>
  );
}

export default function AcademicCvPDF({
  model,
}: {
  model: AcademicCvViewModel;
}) {
  const d = model.data;
  const contacts: CvLink[] = d.basics.contactLinks ?? [
    ...(d.basics.email
      ? [{ label: d.basics.email, href: `mailto:${d.basics.email}` }]
      : []),
    ...(d.basics.phone
      ? [{ label: d.basics.phone, href: `tel:${d.basics.phone}` }]
      : []),
    ...(["orcid", "linkedin", "github", "portfolio"] as const).flatMap((key) =>
      d.basics[key]
        ? [
            {
              label: {
                orcid: "ORCID",
                linkedin: "LinkedIn",
                github: "GitHub",
                portfolio: "Portfolio",
              }[key],
              href: d.basics[key]!,
            },
          ]
        : [],
    ),
  ];
  const content: Record<AcademicSectionId, ReactNode> = {
    researchProfile: <Paragraph>{d.researchProfile}</Paragraph>,
    researchInterests: <Paragraph>{d.researchInterests.join("; ")}</Paragraph>,
    education: d.education.map((item) => (
      <EducationEntry key={item.id} item={item} />
    )),
    researchExperience: d.researchExperience.map((item) => (
      <AcademicEntry
        key={item.id}
        title={item.role}
        date={item.duration}
        context={item.company}
        short={
          item.id === "experience.msc-menulive-research" ||
          (item.description.length === 0 &&
          (item.paragraphs?.join(" ").length ?? 0) < 250)
        }
      >
        {item.supervisor && (
          <Text style={s.metadata}>Supervisor: {item.supervisor}</Text>
        )}
        {item.paragraphs?.map((p, i) => (
          <Paragraph key={i}>{p}</Paragraph>
        ))}
        <Bullets items={item.description} />
      </AcademicEntry>
    )),
    researchOutputs: d.researchOutputs
      .filter((group) => group.items.length)
      .map((group) => (
        <Subsection key={group.title} title={group.title}>
          {group.items.map((item) => (
            <PublicationEntry key={item.id} item={item} />
          ))}
        </Subsection>
      )),
    doctoralResearch: d.doctoralResearch && (
      <View>
        <Text style={s.title} minPresenceAhead={28}>
          {d.doctoralResearch.title}
        </Text>
        {d.doctoralResearch.paragraphs.map((p, i) => (
          <Paragraph key={i}>{p}</Paragraph>
        ))}
      </View>
    ),
    experiences: d.experiences.map((item) => item.id === "experience.qjump" ? (
      <AcademicEntry key={item.id} title={`${item.role} — ${item.company} · ${item.location}`} date={item.duration} compact short>
        {item.description.map((p, i) => <Paragraph key={i}>{p}</Paragraph>)}
      </AcademicEntry>
    ) : (
      <AcademicEntry
        key={item.id}
        title={item.role}
        date={item.duration}
        context={item.company}
        location={[item.location, item.workType].filter(Boolean).join(" · ")}
        compact={item.compact}
        short={item.id === "experience.signator" || (item.compact && item.description.join(" ").length < 300)}
      >
        {item.compact ? (
          item.description.map((p, i) => <Paragraph key={i}>{p}</Paragraph>)
        ) : (
          <Bullets items={item.description} />
        )}
      </AcademicEntry>
    )),
    contributions: (
      <>
        {d.projects.length > 0 && (
          <Subsection title="Personal Project">
            {d.projects.map((item) => (
              <AcademicEntry
                key={item.id}
                title={item.title}
                date={item.date}
                compact
                short={
                  [item.description, ...(item.bullets ?? [])].join(" ").length <
                  300
                }
              >
                <Text style={s.metadata}>
                  {item.role}
                  {item.live && (
                    <>
                      {" "}
                      ·{" "}
                      <Link src={item.live} style={s.contributionLink}>
                        Project
                      </Link>
                    </>
                  )}
                  {item.source && (
                    <>
                      {" "}
                      ·{" "}
                      <Link src={item.source} style={s.contributionLink}>
                        Source
                      </Link>
                    </>
                  )}
                </Text>
                {item.bullets?.length ? (
                  <Bullets items={item.bullets} />
                ) : (
                  <Paragraph>{item.resumeBio || item.description}</Paragraph>
                )}
              </AcademicEntry>
            ))}
          </Subsection>
        )}
        {(
          [
            ["Talk", d.talks],
            ["Technical Writing", d.writing],
            ["Open-Source Contributions", d.openSource],
          ] as const
        )
          .filter(([, items]) => items.length)
          .map(([title, items]) => (
            <Subsection key={title} title={title} compact>
              {items.map((item) => (
                <CompactContributionEntry
                  key={item.id}
                  item={item}
                  projectLinks={title === "Open-Source Contributions"}
                />
              ))}
            </Subsection>
          ))}
      </>
    ),
    skills: d.skills
      .filter((group) => group.items.length)
      .map((group) => (
        <Text key={group.id} style={s.skill} orphans={2} widows={2}>
          <Text style={s.title}>{group.heading}: </Text>
          {group.items.join("; ")}
        </Text>
      )),
    service: d.service.map((item) =>
      item.id === "service.ansec" ? (
        <View key={item.id} style={[s.row, s.compact]} wrap={false}>
          <Text style={[s.primary, s.metadata]}>
            <Text style={s.title}>{item.title}</Text> — {item.context}
          </Text>
          <Text style={s.date}>{item.date}</Text>
        </View>
      ) : (
        <AcademicEntry
          key={item.id}
          title={item.id === "service.codingcoach" ? `${item.title} — ${item.context}` : item.title}
          date={item.date}
          compact
          short={(item.description?.join(" ").length ?? 0) < 250}
        >
          <Text style={s.metadata}>
            {[...(item.id === "service.codingcoach" ? [] : [item.context]), ...(item.description ?? [])]
              .filter(Boolean)
              .join(" · ")}
          </Text>
          <Links links={item.links} />
        </AcademicEntry>
      ),
    ),
  };
  return (
    <Document
      title="PhD Academic CV - Template"
      author={d.basics.name}
      language="en"
    >
      <Page size="A4" style={s.page} wrap>
        <View wrap={false}>
          <Text style={s.name}>{d.basics.name}</Text>
          <Text style={s.descriptor}>{d.basics.title}</Text>
          <Text style={s.contacts}>
            {d.basics.location}
            {contacts.map((link, i) => (
              <Text key={link.href}>
                {d.basics.location || i > 0 ? " · " : ""}
                <Link src={link.href} style={s.link}>
                  {link.label}
                </Link>
              </Text>
            ))}
          </Text>
        </View>
        {model.sections.map((section) => (
          <Fragment key={section.id}>
            <View
              wrap={false}
              minPresenceAhead={section.id === "experiences" ? 95 : 40}
            >
              <Text
                style={
                  section.id === "service"
                    ? [s.sectionHeading, s.serviceSectionSpacing]
                    : section.id === "contributions" || section.id === "skills"
                    ? [s.sectionHeading, s.secondarySectionSpacing]
                    : s.sectionHeading
                }
              >
                {section.title.toUpperCase()}
              </Text>
            </View>
            {content[section.id]}
          </Fragment>
        ))}
        <View
          style={s.footer}
          fixed
          render={({ pageNumber }) => (
            <>
              <Text style={{ width: "80%", fontSize: 8.5, lineHeight: "10pt" }}>
                {d.basics.name}
              </Text>
              <Text
                style={{
                  width: "20%",
                  textAlign: "right",
                  fontSize: 8.5,
                  lineHeight: "10pt",
                }}
              >
                Page {pageNumber}
              </Text>
            </>
          )}
        />
      </Page>
    </Document>
  );
}
