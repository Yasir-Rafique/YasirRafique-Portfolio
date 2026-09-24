# PhD Academic CV template

Open `/resume/phd-academic`. The preview embeds the same selectable, linked A4 PDF offered by **Download PDF**. Use the PDF viewer's print control or **Open PDF** to print, including on browsers that cannot embed PDFs. The browser shell is not a second document renderer.

## Canonical composition

- `src/composition/resume-registry.ts` registers `phd-academic` alongside the existing CV configurations. Its `sectionOrder` controls order and inclusion.
- `composeResume("phd-academic")` selects the academic branch of the existing composer. Professional CV composition remains unchanged.
- `src/domain/academic-cv.ts` extends canonical education, experience, publication, project and skill records with research-specific fields. Existing canonical records can be selected by reference and enriched in composition; they need not be copied into each template.
- `src/data/academic-cv.placeholder.ts` is an explicitly neutral review fixture. It contains no applicant facts. All sample destinations use reserved `example.org` URLs, including the ORCID and PR placeholders; they are not claims of verified identities or contributions.
- `composeAcademicCv(filename, sectionOrder, data)` accepts replacement data from the canonical data layer and omits empty sections and output groups. Populating real content is a separate task.
- `src/pdf/AcademicCvPDF.tsx` contains reusable entry, education, citation, contribution and subsection primitives. `src/pdf/academic-styles.ts` centralises print typography, page geometry and spacing.

There are no forced page breaks. Section headings reserve supporting content, short entries stay together, and longer entries and citations can flow. The default fixture targets two pages, while expanded content is allowed to overflow. The footer regenerates styled children through the renderer's `render` callback to avoid repeated line-height resolution on dynamic text in the installed renderer.

## Fonts

Self-hosted files in `public/fonts/source-serif-4/` come from Adobe's official repository, `https://github.com/adobe-fonts/source-serif/tree/release/TTF`. Regular, Semibold, Bold and Italic are each used by the design. The accompanying `LICENSE.md` contains the SIL Open Font License. No runtime font requests go to an external service. No PDF library or dependency was added or replaced.

## Verification

Run the existing checks:

```powershell
npx tsc -b
npm run lint
npm run build
```

Generate the review PDF and a deliberately expanded overflow fixture with the existing Vite/esbuild and React PDF dependencies:

```powershell
node -e "require('esbuild').buildSync({entryPoints:['scripts/verify-academic-cv.tsx'],bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',outfile:'node_modules/.tmp/verify-academic-cv.mjs'})"
node node_modules/.tmp/verify-academic-cv.mjs
```

Generated files are in ignored `artifacts/`. The script also checks section ordering, canonical record reuse and omission of empty sections. Review both PDFs after changes to typography or content. For this implementation, PDF.js and Chromium already installed elsewhere on the workstation were used only as inspection tools; they are not application dependencies.
