import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "./src/database/schema.ts",
  out: "./migrations",
  driver: "pg",
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
