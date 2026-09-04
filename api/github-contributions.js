const GITHUB_USERNAME = "mctorre8720val-eng";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "GITHUB_TOKEN is not configured.",
    });
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

      return res.status(500).json({
        error: "Failed to retrieve GitHub data.",
      });
    }

    const user = data.data.user;

    return res.status(200).json({
      contributions:
        user.contributionsCollection
          .contributionCalendar.totalContributions,

      repositories:
        user.repositories.totalCount,

      followers:
        user.followers.totalCount,
    });
  } catch (error) {
    console.error(
      "GitHub contribution request failed:",
      error
    );

    return res.status(500).json({
      error: "Unable to connect to GitHub.",
    });
  }
}