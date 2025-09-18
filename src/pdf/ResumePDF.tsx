import {
  Document,
  Page,
  Text,
  //Tspan,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { renderPDFMarkdown } from "../utils/renderMarkdown";

// ---- Styles ----
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.35,
  },
  header: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 6,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 11, marginTop: 8, color: "#333" },
  contactRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
    flexWrap: "wrap" as any,
  },
  contactLink: { color: "#1f6feb", textDecoration: "underline", fontSize: 9 },

  section: { marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 6 },
  subTitle: { fontSize: 12, fontWeight: "bold" },
  subHighlight: { fontSize: 10, fontWeight: "bold" },
  smallText: { fontSize: 10, color: "#333" },
  listItem: { marginBottom: 2 },

  highlightsGrid: { flexDirection: "row", gap: 8 },
  highlightsCol: { flex: 1 },
  highlightBlock: { marginBottom: 6 },

  twoCol: { flexDirection: "row", gap: 12 },
  col: { flex: 1 },
});

// ---- Props ----
type ResumePDFProps = {
  basics: {
    name: string;
    title: string;
    email?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    location?: string;
    phone?: string;
  };
  summary: string;
  skills: { heading: string; items: string[] }[];
  achievements?: {
    title: string;
    org?: string;
    date?: string;
    description: string[];
    showResume?: boolean;
  }[];
  publications?: {
    title: string;
    platform?: string;
    date?: string;
    link?: string;
    showResume?: boolean;
  }[];
  speaking?: {
    title: string;
    event?: string;
    date?: string;
    showResume?: boolean;
  }[];
  certifications?: {
    title: string;
    issuer?: string;
    date?: string;
    skills?: string[];
    link?: string;
    file?: string;
    showResume?: boolean;
  }[];
  interests: { title: string; description?: string }[];
  experiences: {
    role?: string;
    company?: string;
    location?: string;
    workType?: string;
    duration?: string;
    description?: string[];
    stack?: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    start?: string;
    end?: string;
    details?: string[];
  }[];
  projects: {
    Personal: {
      title: string;
      role?: string;
      resumeBio?: string;
      stack?: string[];
      live?: string;
      source?: string;
    }[];
    GitHub?: {
      title: string;
      role?: string;
      resumeBio?: string;
      stack?: string[];
      live?: string;
      source?: string;
    }[];
  };
  pageSize?: "A3" | "A4";
};

export default function ResumePDF(props: ResumePDFProps) {
  const {
    basics,
    summary,
    skills,
    achievements = [],
    publications = [],
    speaking = [],
    certifications = [],
    interests,
    experiences,
    education,
    projects,
    pageSize = "A4",
  } = props;

  // Build highlights (only items with showResume === true)
  const achForResume = (achievements || [])
    .filter((a) => a.showResume)
    .slice(0, 3);
  const pubForResume = (publications || [])
    .filter((p) => p.showResume)
    .slice(0, 3);
  const certForResume = (certifications || [])
    .filter((c) => c.showResume)
    .slice(0, 3);
  const speakForResume = (speaking || [])
    .filter((s) => s.showResume)
    .slice(0, 3);

  const highlights = [
    ...achForResume.map((a) => ({
      type: "achievement",
      title: a.title,
      meta: `${a.org || ""} ${a.date ? `• ${a.date}` : ""}`,
    })),
    ...pubForResume.map((p) => ({
      type: "publication",
      title: p.title,
      meta: `${p.platform || ""} ${p.date ? `• ${p.date}` : ""}`,
    })),
    ...certForResume.map((c) => ({
      type: "cert",
      title: c.title,
      meta: `${c.issuer || ""} ${c.date ? `• ${c.date}` : ""}`,
    })),
    ...speakForResume.map((s) => ({
      type: "speaking",
      title: s.title,
      meta: `${s.event || ""} ${s.date ? `• ${s.date}` : ""}`,
    })),
  ];

  // split highlights into two columns
  const leftHighlights = highlights.filter((_, i) => i % 2 === 0);
  const rightHighlights = highlights.filter((_, i) => i % 2 === 1);

  // split skills into two columns of groups
  const skillMid = Math.ceil((skills || []).length / 2);
  const leftSkillGroups = (skills || []).slice(0, skillMid);
  const rightSkillGroups = (skills || []).slice(skillMid);

  // split interests into two columns
  const interestMid = Math.ceil((interests || []).length / 2);
  const leftInterests = (interests || []).slice(0, interestMid);
  const rightInterests = (interests || []).slice(interestMid);

  return (
    <Document>
      <Page size={pageSize} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{basics.name}</Text>
          <Text style={styles.title}>{basics.title}</Text>

          <View style={styles.contactRow}>
            {basics.email && (
              <Link src={`mailto:${basics.email}`} style={styles.contactLink}>
                {basics.email}
              </Link>
            )}
            {basics.github && (
              <Link src={`https://${basics.github}`} style={styles.contactLink}>
                GitHub
              </Link>
            )}
            {basics.linkedin && (
              <Link
                src={`https://${basics.linkedin}`}
                style={styles.contactLink}
              >
                LinkedIn
              </Link>
            )}
            {basics.portfolio && (
              <Link
                src={`https://${basics.portfolio}`}
                style={styles.contactLink}
              >
                Portfolio
              </Link>
            )}
            {basics.location && (
              <Text style={styles.smallText}>{basics.location}</Text>
            )}
          </View>
        </View>

        {/* Summary + Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.smallText}>{renderPDFMarkdown(summary)}</Text>

          {highlights.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text
                style={{ fontSize: 10, fontWeight: "bold", marginBottom: 6 }}
              >
                Portfolio highlights
              </Text>
              <View style={styles.highlightsGrid}>
                <View style={styles.highlightsCol}>
                  {leftHighlights.map((h, i) => (
                    <View key={`hl-left-${i}`} style={styles.highlightBlock}>
                      <Text style={styles.subHighlight}>{h.title}</Text>
                      {h.meta ? (
                        <Text style={styles.smallText}>{h.meta}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>

                <View style={styles.highlightsCol}>
                  {rightHighlights.map((h, i) => (
                    <View key={`hl-right-${i}`} style={styles.highlightBlock}>
                      <Text style={styles.subHighlight}>{h.title}</Text>
                      {h.meta ? (
                        <Text style={styles.smallText}>{h.meta}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {experiences.map((e, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>
                  {e.role} @ {e.company}
                </Text>
                <Text style={[styles.smallText, { marginLeft: 8 }]}>
                  {e.duration}
                </Text>
              </View>

              <Text style={styles.smallText}>
                {e.location} {e.workType ? `• ${e.workType}` : ""}
              </Text>

              {e.description?.slice(0, 4).map((d, j) => (
                <View key={j} style={{ marginBottom: 2 }}>
                  {renderPDFMarkdown(d, "- ")}
                </View>
              ))}

              {e.stack?.length ? (
                <Text style={styles.smallText}>
                  Tech: {renderPDFMarkdown(e.stack.join(", "))}
                </Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.subTitle}>{edu.degree}</Text>
                <Text style={[styles.smallText, { marginLeft: 8 }]}>
                  {edu.start} – {edu.end}
                </Text>
              </View>

              <Text style={styles.smallText}>{edu.institution}</Text>

              {edu.details?.map((d, j) => (
                <View key={j} style={{ marginBottom: 2 }}>
                  {renderPDFMarkdown(d, "- ")}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {(projects?.Personal || []).map((p, idx) => (
            <View key={idx} style={{ marginBottom: 6 }}>
              <Text style={styles.subTitle}>{p.title}</Text>
              {p.role && <Text style={styles.smallText}>{p.role}</Text>}
              {p.resumeBio && (
                <View style={{ marginBottom: 2 }}>
                  {renderPDFMarkdown(p.resumeBio)}
                </View>
              )}
              {p.stack?.length ? (
                <Text style={styles.smallText}>
                  Tech: {renderPDFMarkdown(p.stack.join(", "))}
                </Text>
              ) : null}
              {/* {p.live && (
                <Link src={p.live} style={styles.contactLink}>
                  Live
                </Link>
              )} */}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={styles.col}>
              {leftSkillGroups.map((g, i) => (
                <View key={`ls-${i}`} style={{ marginBottom: 6 }}>
                  <Text style={styles.subTitle}>{g.heading}</Text>
                  {g.items.map((it, j) => (
                    <Text key={`ls-item-${j}`} style={styles.smallText}>
                      • {it}
                    </Text>
                  ))}
                </View>
              ))}
            </View>

            <View style={styles.col}>
              {rightSkillGroups.map((g, i) => (
                <View key={`rs-${i}`} style={{ marginBottom: 6 }}>
                  <Text style={styles.subTitle}>{g.heading}</Text>
                  {g.items.map((it, j) => (
                    <Text key={`rs-item-${j}`} style={styles.smallText}>
                      • {it}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={styles.col}>
              {leftInterests.map((it, k) => (
                <View key={`li-${k}`} style={{ marginBottom: 6 }}>
                  <Text style={styles.subTitle}>{it.title}</Text>
                  {it.description && (
                    <Text style={styles.smallText}>{it.description}</Text>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.col}>
              {rightInterests.map((it, k) => (
                <View key={`ri-${k}`} style={{ marginBottom: 6 }}>
                  <Text style={styles.subTitle}>{it.title}</Text>
                  {it.description && (
                    <Text style={styles.smallText}>{it.description}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
