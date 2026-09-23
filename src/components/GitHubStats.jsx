import { useEffect, useState, useMemo } from "react";

const GITHUB_USERNAME = "kel-se";
const COLOR_LEVELS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function GitHubStats() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!response.ok) {
          throw new Error(`API response status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted && result && Array.isArray(result.contributions)) {
          setData(result);
          setHasError(false);
        } else if (isMounted) {
          setHasError(true);
        }
      } catch (err) {
        console.error("Failed to fetch contribution data:", err);
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Organize days into weeks and calculate month labels
  const calendarData = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return null;
    }

    const contributions = data.contributions;
    const weeks = [];
    let currentWeek = [];
    const monthLabels = [];

    let lastMonth = -1;

    contributions.forEach((day, index) => {
      const [year, month, dateNum] = day.date.split("-").map(Number);
      const dayOfWeek = new Date(year, month - 1, dateNum).getDay(); // 0 = Sun

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push({ ...day, dayOfWeek, monthIndex: month - 1 });

      // Check for month label placement
      if (month - 1 !== lastMonth) {
        monthLabels.push({
          monthName: MONTH_NAMES[month - 1],
          weekIndex: weeks.length
        });
        lastMonth = month - 1;
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return { weeks, monthLabels };
  }, [data]);

  const totalContributions = data?.total?.lastYear ?? 0;

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
          A snapshot of my coding activity and contributions on GitHub over the past year.
        </p>
      </div>

      <div className="github-contributions-container">
        {!isLoading && !hasError && calendarData ? (
          <div className="github-calendar-wrapper">
            <div className="github-calendar-header">
              <span className="github-total-count">
                <strong>{totalContributions}</strong> contributions in the last year
              </span>
            </div>

            <div className="github-svg-container">
              <svg
                width="100%"
                viewBox="0 0 740 120"
                className="github-calendar-svg"
                aria-label="GitHub contribution calendar"
              >
                {/* Month labels */}
                <g className="month-labels" transform="translate(30, 15)">
                  {calendarData.monthLabels.map((lbl, idx) => (
                    <text
                      key={idx}
                      x={lbl.weekIndex * 13}
                      y="0"
                      fill="#8b949e"
                      fontSize="10"
                      fontFamily="sans-serif"
                    >
                      {lbl.monthName}
                    </text>
                  ))}
                </g>

                {/* Day labels (Mon, Wed, Fri) */}
                <g className="day-labels" fill="#8b949e" fontSize="9" fontFamily="sans-serif">
                  <text x="10" y="38">Mon</text>
                  <text x="10" y="64">Wed</text>
                  <text x="10" y="90">Fri</text>
                </g>

                {/* Squares grid */}
                <g className="calendar-grid" transform="translate(30, 22)">
                  {calendarData.weeks.map((week, weekIdx) => (
                    <g key={weekIdx} transform={`translate(${weekIdx * 13}, 0)`}>
                      {week.map((day) => {
                        const level = Math.min(Math.max(day.level || 0, 0), 4);
                        const fillColor = COLOR_LEVELS[level];
                        const formattedDateStr = formatDate(day.date);
                        const labelText = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formattedDateStr}`;

                        return (
                          <rect
                            key={day.date}
                            width="10"
                            height="10"
                            x="0"
                            y={day.dayOfWeek * 13}
                            rx="2"
                            ry="2"
                            fill={fillColor}
                            stroke="rgba(255, 255, 255, 0.04)"
                            strokeWidth="1"
                            className="contribution-square"
                            onMouseEnter={() =>
                              setHoveredDay({
                                label: labelText,
                                count: day.count,
                                date: formattedDateStr
                              })
                            }
                            onMouseLeave={() => setHoveredDay(null)}
                          >
                            <title>{labelText}</title>
                          </rect>
                        );
                      })}
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            {/* Hover Tooltip / Status indicator */}
            <div className="github-calendar-footer">
              <div className="github-tooltip-info">
                {hoveredDay ? (
                  <span>{hoveredDay.label}</span>
                ) : (
                  <span className="github-tooltip-placeholder">
                    Hover over a block to view activity details
                  </span>
                )}
              </div>

              <div className="github-legend">
                <span>Less</span>
                <ul className="github-legend-squares">
                  {COLOR_LEVELS.map((color, idx) => (
                    <li key={idx} style={{ backgroundColor: color }} />
                  ))}
                </ul>
                <span>More</span>
              </div>
            </div>
          </div>
        ) : hasError ? (
          /* Fallback image tag if API fails (bypasses CORS) */
          <div className="github-graph-fallback-img">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`https://ghchart.rshah.org/39d353/${GITHUB_USERNAME}`}
                alt={`GitHub Contribution Graph for ${GITHUB_USERNAME}`}
                loading="lazy"
                className="github-fallback-chart"
              />
            </a>
          </div>
        ) : (
          /* Loading skeleton */
          <div className="github-graph-loading-placeholder">
            <div className="github-loading-spinner" />
            <p>Loading GitHub contributions...</p>
          </div>
        )}
      </div>
    </section>
  );
}
