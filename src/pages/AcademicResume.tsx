import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { composeResume } from "../composition";
import AcademicCvPDF from "../pdf/AcademicCvPDF";
import { registerAcademicFonts } from "../pdf/academic-styles";
import "./academic-resume.css";

const model = composeResume("phd-academic");
registerAcademicFonts();

export default function AcademicResumeRoute() {
  const [url, setUrl] = useState<string>();
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    let objectUrl: string | undefined;
    pdf(<AcademicCvPDF model={model} />)
      .toBlob()
      .then((blob) => {
        if (active) {
          objectUrl = URL.createObjectURL(blob);
          setUrl(objectUrl);
        }
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);
  return (
    <div className="academic-preview">
      <div className="academic-controls">
        <div>
          <h1>PhD Academic CV</h1>
          <p>
            Placeholder template · A4 · Print using the PDF viewer’s print
            control.
          </p>
        </div>
        {url && (
          <div>
            <a href={url} download={model.outputFilename}>
              Download PDF
            </a>
            <a href={url} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </div>
        )}
      </div>
      {error ? (
        <p role="alert">
          The PDF could not be generated. Check that the local Source Serif 4
          font files are available, then reload.
        </p>
      ) : !url ? (
        <p role="status">Preparing academic CV…</p>
      ) : (
        <object
          className="academic-document"
          data={`${url}#view=FitH`}
          type="application/pdf"
          aria-label="PhD Academic CV placeholder preview"
        >
          <p>
            Your browser cannot display the PDF here.{" "}
            <a href={url}>Open the academic CV PDF</a> to review or print it.
          </p>
        </object>
      )}
    </div>
  );
}
