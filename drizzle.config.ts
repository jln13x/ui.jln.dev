import { env } from "@/env";

import { config } from "dotenv";
import { type Config } from "drizzle-kit";
import { TABLE_NAME } from "project.config";

if (process.env.USE_PROD_DB) {
  config({ path: ".env.prod", override: true });
}

const dbUrl = process.env.DATABASE_URL || env.DATABASE_URL;

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    uri: dbUrl,
  },
  tablesFilter: [TABLE_NAME + "_*"],
} satisfies Config;
