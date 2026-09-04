import http from "node:http";
import { spawn } from "node:child_process";

const PORT = 3001;
const GITHUB_USERNAME = "mctorre8720val-eng";

async function getPublicFallbackStats() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-site",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `GitHub profile request failed: ${response.status}`
      );
    }

    const user = await response.json();

    return {
      contributions: null,
      repositories: user.public_repos ?? null,
      followers: user.followers ?? null,
    };
  } catch (error) {
    console.error("GitHub public fallback failed:", error);
    return {
      contributions: null,
      repositories: null,
      followers: null,
    };
  }
}

async function getGitHubStats() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return getPublicFallbackStats();
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }

        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
        }

        followers {
          totalCount
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error("GitHub GraphQL error:", data);
      return getPublicFallbackStats();
    }

    const user = data.data?.user ?? {};

    return {
      contributions:
        user?.contributionsCollection?.contributionCalendar
          ?.totalContributions ?? null,
      repositories: user?.repositories?.totalCount ?? null,
      followers: user?.followers?.totalCount ?? null,
    };
  } catch (error) {
    console.error("GitHub GraphQL request failed:", error);
    return getPublicFallbackStats();
  }
}

async function getProjectGithubRepoStats(repoName) {
  const token = process.env.GITHUB_TOKEN;
  const repoUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const repoResponse = await fetch(repoUrl, { headers });
    const repoData = await repoResponse.json();

    if (!repoResponse.ok) {
      throw new Error(
        `GitHub repo request failed for ${repoName}: ${repoResponse.status} ${repoData?.message ?? ""}`
      );
    }

    let commits = 0;

    const contributorsResponse = await fetch(
      `${repoUrl}/contributors?per_page=100`,
      { headers }
    );

    if (contributorsResponse.ok) {
      const contributors = await contributorsResponse.json();
      commits = Array.isArray(contributors)
        ? contributors.reduce(
            (total, contributor) =>
              total + (Number(contributor?.contributions) || 0),
            0
          )
        : 0;
    } else {
      const contributorData = await contributorsResponse.json().catch(() => ({}));
      console.warn(
        `GitHub contributors request for ${repoName} was not ok:`,
        contributorData
      );
    }

    return {
      repo: repoName,
      commits,
      stars: Number(repoData?.stargazers_count ?? 0),
      forks: Number(repoData?.forks_count ?? 0),
    };
  } catch (error) {
    console.error(`Failed to load GitHub stats for ${repoName}:`, error);

    return {
      repo: repoName,
      commits: 0,
      stars: 0,
      forks: 0,
    };
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  if (url.pathname === "/api/github-contributions") {
    const stats = await getGitHubStats();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(stats));
    return;
  }

  if (url.pathname === "/api/project-github-stats") {
    const repoNames = [
      "Dormly",
      "DevTrack",
      "ScentGuard_new",
    ];

    const statResults = await Promise.all(
      repoNames.map((repoName) => getProjectGithubRepoStats(repoName))
    );

    const statsMap = {};

    statResults.forEach((result) => {
      statsMap[result.repo] = result;
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(statsMap));
    return;
  }

  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<!DOCTYPE html><html><body>Not found</body></html>`);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Local GitHub API server running on http://localhost:${PORT}`);

  const viteProcess = spawn("npx", ["vite", "--host", "0.0.0.0"], {
    stdio: "inherit",
    shell: true,
  });

  viteProcess.on("exit", (code) => {
    console.log(`Vite exited with code ${code}`);
    process.exit(code ?? 0);
  });
});
