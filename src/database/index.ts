import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

dotenv.config();

const connectionString = process.env.DATABASE_URL || "";

const connection = postgres(connectionString);

export const db = drizzle(connection, { logger: true, schema });
