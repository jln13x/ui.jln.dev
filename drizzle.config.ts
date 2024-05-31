import { config } from "dotenv";
import { type Config } from "drizzle-kit";
import { TABLE_NAME } from "project.config";

if (process.env.USE_PROD_DB) {
  config({ path: ".env.prod", override: true });
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  tablesFilter: [TABLE_NAME + "_*"],
} satisfies Config;
