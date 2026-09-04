const GITHUB_USERNAME = "mctorre8720val-eng";
const REPO_NAMES = ["Dormly", "DevTrack", "ScentGuard_new"];

async function getRepoStats(repoName) {
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
      const contributionData = await contributorsResponse.json().catch(() => ({}));
      console.warn(
        `GitHub contributors request for ${repoName} was not ok:`,
        contributionData
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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const results = await Promise.all(
      REPO_NAMES.map((repoName) => getRepoStats(repoName))
    );

    const statsMap = {};
    results.forEach((result) => {
      statsMap[result.repo] = result;
    });

    return res.status(200).json(statsMap);
  } catch (error) {
    console.error("Project GitHub stats failure:", error);
    return res.status(200).json({
      Dormly: { repo: "Dormly", commits: 0, stars: 0, forks: 0 },
      DevTrack: { repo: "DevTrack", commits: 0, stars: 0, forks: 0 },
      ScentGuard_new: {
        repo: "ScentGuard_new",
        commits: 0,
        stars: 0,
        forks: 0,
      },
    });
  }
}
