import { useEffect, useState } from "react";

function transformSvgToGitHubDark(svgText) {
  if (!svgText) return "";
  return svgText
    .replace(/fill:#eeeeee/gi, "fill:#161b22")
    .replace(/fill:#c6e48b/gi, "fill:#0e4429")
    .replace(/fill:#7bc96f/gi, "fill:#006d32")
    .replace(/fill:#239a3b/gi, "fill:#26a641")
    .replace(/fill:#196127/gi, "fill:#39d353")
    .replace(/fill:#767676/gi, "fill:#8b949e");
}

export default function GitHubStats() {
  const [svgContent, setSvgContent] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSvg() {
      try {
        const response = await fetch("https://ghchart.rshah.org/kel-se");
        if (!response.ok) {
          throw new Error(`Failed to load contribution graph: ${response.status}`);
        }
        const text = await response.text();
        if (isMounted && text.includes("<svg")) {
          setSvgContent(transformSvgToGitHubDark(text));
        } else if (isMounted) {
          setHasError(true);
        }
      } catch (err) {
        console.error("GitHub chart inline fetch error:", err);
        if (isMounted) {
          setHasError(true);
        }
      }
    }

    loadSvg();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="github-contributions"
      className="github-contributions-section"
      aria-label="GitHub Contribution Activity"
    >
      <div className="section-heading">
        <p className="eyebrow">GitHub</p>
        <h2 className="github-contributions-heading">Contribution Activity</h2>
        <p className="section-copy">
          A snapshot of my coding activity and contributions on GitHub.
        </p>
      </div>

      <div className="github-contributions-container">
        {svgContent ? (
          <div
            className="github-graph-wrapper"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : hasError ? (
          <div className="github-graph-fallback">
            <p>Contribution graph unavailable.</p>
          </div>
        ) : (
          <div className="github-graph-wrapper">
            <div className="github-graph-loading-placeholder" />
          </div>
        )}
      </div>
    </section>
  );
}
