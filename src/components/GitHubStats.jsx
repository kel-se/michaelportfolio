import { useEffect, useState } from "react";

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github-contributions");

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub statistics");
        }

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error("GitHub stats error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      id="github-stats"
      className="github-stats-section"
    >
      <div className="section-heading">
        <p className="eyebrow">GitHub</p>

        <h2>GitHub Activity</h2>

        <p className="section-copy">
          A look at my activity and contributions across GitHub.
        </p>
      </div>

      <div className="github-stats-grid">
        <div className="github-total-stat">
          <strong>
            {loading
              ? "..."
              : error
              ? "—"
              : stats?.contributions ?? "0"}
          </strong>

          <span>Total Contributions</span>
        </div>

        <div className="github-total-stat">
          <strong>
            {loading
              ? "..."
              : error
              ? "—"
              : stats?.repositories ?? "0"}
          </strong>

          <span>Repositories</span>
        </div>

        <div className="github-total-stat">
          <strong>
            {loading
              ? "..."
              : error
              ? "—"
              : stats?.followers ?? "0"}
          </strong>

          <span>Followers</span>
        </div>
      </div>

      <a
        href="https://github.com/mctorre8720val-eng"
        target="_blank"
        rel="noreferrer"
        className="github-profile-link"
      >
        View GitHub Profile →
      </a>
    </section>
  );
}