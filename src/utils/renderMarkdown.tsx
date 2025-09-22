import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
});

export const renderPDFMarkdown = (text: string, prefix: string = "") => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <Text>
      {prefix}
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={idx} style={styles.bold}>
              {part.replace(/\*\*/g, "")}
            </Text>
          );
        } else if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <Text key={idx} style={styles.italic}>
              {part.replace(/\*/g, "")}
            </Text>
          );
        }
        return <Text key={idx}>{part}</Text>;
      })}
    </Text>
  );
};
