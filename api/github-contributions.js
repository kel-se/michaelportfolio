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
        `GitHub public profile request failed: ${response.status}`
      );
    }

    const user = await response.json();

    return {
      contributions: null,
      repositories: user.public_repos ?? null,
      followers: user.followers ?? null,
    };
  } catch (error) {
    console.error(
      "GitHub public fallback failed:",
      error
    );

    return {
      contributions: null,
      repositories: null,
      followers: null,
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    const fallback = await getPublicFallbackStats();

    return res.status(200).json(fallback);
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }

        repositories(
          first: 100
          ownerAffiliations: OWNER
          privacy: PUBLIC
        ) {
          totalCount
        }

        followers {
          totalCount
        }
      }
    }
  `;

  try {
    const response = await fetch(
      "https://api.github.com/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error("GitHub GraphQL error:", data);

      return res.status(200).json(
        await getPublicFallbackStats()
      );
    }

    const user = data.data.user;

    return res.status(200).json({
      contributions:
        user?.contributionsCollection?.contributionCalendar
          ?.totalContributions ?? null,
      repositories:
        user?.repositories?.totalCount ?? null,
      followers:
        user?.followers?.totalCount ?? null,
    });
  } catch (error) {
    console.error(
      "GitHub contribution request failed:",
      error
    );

    return res.status(200).json(
      await getPublicFallbackStats()
    );
  }
}