# Contributing

I appreciate that you are trying help out and I apologize that this project is not optimized (not fast/easy to set up) for contributions.

## Installation

We use [bun](https://bun.sh/) as our package manager.

```bash
git clone git@github.com:ui.jln.dev/ui.jln.dev.git
cd ui.jln.dev
bun install
bun dev
```

## Env Variables

Create a `.env` File and copy the values from `.env.example`.

### DATABASE_URL

- Create a [PlanetScale](https://planetscale.com/) Database and use that URL.
- Make sure it matches that format: "mysql://\*\*\*:\*\*\*@aws.connect.psdb.cloud/\*\*\*?ssl={"rejectUnauthorized":true}"

### DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET

[Discord Developers](https://discord.com/developers/applications)

### GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET

[Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

### NEXTAUTH_SECRET / NEXTAUTH_URL

Keep it as it is

### UPSTASH_REDIS_REST_TOKEN / UPSTASH_REDIS_REST_URL

Create an [Upstash](https://upstash.com/) project
