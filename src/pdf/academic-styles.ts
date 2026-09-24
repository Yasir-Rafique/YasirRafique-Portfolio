import { Font, StyleSheet } from "@react-pdf/renderer";

export function registerAcademicFonts(base = "/fonts/source-serif-4") {
  Font.register({
    family: "Source Serif 4",
    fonts: [
      { src: `${base}/Regular.ttf`, fontWeight: 400 },
      { src: `${base}/Semibold.ttf`, fontWeight: 600 },
      { src: `${base}/Bold.ttf`, fontWeight: 700 },
      { src: `${base}/Italic.ttf`, fontStyle: "italic" },
    ],
  });
}

// PDF points: 20 mm horizontal and 19 mm vertical margins. These are the
// canonical print styles; the preview displays this very same PDF document.
export const academicStyles = StyleSheet.create({
  page: {
    paddingHorizontal: 56.69,
    paddingTop: 53.86,
    paddingBottom: 53.86,
    fontFamily: "Source Serif 4",
    fontSize: 10.25,
    lineHeight: 1.32,
    color: "#202020",
    backgroundColor: "#ffffff",
  },
  name: { fontSize: 22, fontWeight: 600, lineHeight: 1.12, color: "#28383c" },
  descriptor: { marginTop: 3, fontSize: 10.5 },
  contacts: { marginTop: 5, fontSize: 9.5, color: "#444444", lineHeight: 1.3 },
  link: { color: "#28383c", textDecoration: "underline" },
  contributionLink: { color: "#28383c", textDecoration: "none" },
  contributionSubsection: {
    fontSize: 9.75,
    fontWeight: 600,
    color: "#454545",
    marginTop: 1,
    marginBottom: 2,
  },
  sectionHeading: {
    marginTop: 15,
    marginBottom: 7,
    paddingBottom: 3,
    borderBottomWidth: 0.45,
    borderBottomColor: "#929898",
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: 0.5,
    color: "#28383c",
  },
  entry: { marginBottom: 8 },
  // Local closing-section spacing; preserve the global section rhythm elsewhere.
  serviceSectionSpacing: { marginTop: 7, marginBottom: 4 },
  secondarySectionSpacing: { marginTop: 8, marginBottom: 4 },
  compact: { marginBottom: 4 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  primary: { flexGrow: 1, flexShrink: 1, flexBasis: 0 },
  date: {
    width: 86,
    flexShrink: 0,
    fontSize: 9.5,
    color: "#454545",
    textAlign: "right",
  },
  title: { fontSize: 10.75, fontWeight: 600 },
  metadata: { fontSize: 9.75, color: "#454545" },
  paragraph: { marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2.5, paddingLeft: 4 },
  bulletMark: { width: 10 },
  bulletText: { flexGrow: 1, flexShrink: 1, flexBasis: 0 },
  subsection: {
    fontSize: 10.5,
    fontWeight: 600,
    marginBottom: 4,
    marginTop: 3,
  },
  citation: { fontSize: 10, paddingLeft: 12, textIndent: -12, marginBottom: 5 },
  italic: { fontStyle: "italic" },
  skill: { marginBottom: 5 },
  footer: {
    position: "absolute",
    bottom: 27,
    left: 56.69,
    right: 56.69,
    height: 14,
    flexDirection: "row",
    color: "#555555",
    fontSize: 1,
    lineHeight: 1,
  },
});
