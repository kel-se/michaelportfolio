import { useEffect, useState } from "react";

const formatGitHubStat = (value) =>
  value === null || value === undefined ? "—" : value;

export default function GitHubStats() {
  const [stats, setStats] = useState({
    contributions: null,
    repositories: null,
    followers: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/github-contributions");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch GitHub statistics: ${response.status}`
          );
        }

        const data = await response.json();

        setStats({
          contributions: data?.contributions ?? null,
          repositories: data?.repositories ?? null,
          followers: data?.followers ?? null,
        });
      } catch (fetchError) {
        console.error("GitHub stats error:", fetchError);
        setError(true);
        setStats({
          contributions: null,
          repositories: null,
          followers: null,
        });
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
      aria-live="polite"
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
            {loading ? "..." : error ? "—" : formatGitHubStat(stats.contributions)}
          </strong>

          <span>Total Contributions</span>
        </div>

        <div className="github-total-stat">
          <strong>
            {loading ? "..." : error ? "—" : formatGitHubStat(stats.repositories)}
          </strong>

          <span>Repositories</span>
        </div>

        <div className="github-total-stat">
          <strong>
            {loading ? "..." : error ? "—" : formatGitHubStat(stats.followers)}
          </strong>

          <span>Followers</span>
        </div>
      </div>

      <a
        href="https://github.com/mctorre8720val-eng"
        target="_blank"
        rel="noreferrer noopener"
        className="github-profile-link"
      >
        View GitHub Profile →
      </a>
    </section>
  );
}