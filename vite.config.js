import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url !== "/api/github-contributions") {
        return next();
      }

      if (req.method !== "GET") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Method not allowed" }));
        return;
      }

      try {
        const username = "mctorre8720val-eng";
        const token = process.env.GITHUB_TOKEN;

        if (token) {
          const query = `
            query {
              user(login: "${username}") {
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
            throw new Error(data?.errors?.[0]?.message ?? "GitHub GraphQL request failed");
          }

          const user = data.data?.user ?? {};

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              contributions:
                user?.contributionsCollection?.contributionCalendar
                  ?.totalContributions ?? null,
              repositories: user?.repositories?.totalCount ?? null,
              followers: user?.followers?.totalCount ?? null,
            })
          );
          return;
        }

        const publicResponse = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "User-Agent": "portfolio-site",
            },
          }
        );

        if (!publicResponse.ok) {
          throw new Error(
            `GitHub profile request failed: ${publicResponse.status}`
          );
        }

        const user = await publicResponse.json();

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            contributions: null,
            repositories: user.public_repos ?? null,
            followers: user.followers ?? null,
          })
        );
      } catch (error) {
        console.error("Local GitHub API proxy failed:", error);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            contributions: null,
            repositories: null,
            followers: null,
          })
        );
      }
    });
  },
});
