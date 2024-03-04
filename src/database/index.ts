import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Client } from "pg";

const connectionString = process.env.DATABASE_URL || "";
console.log(connectionString);
const connection = new Client({ connectionString });

export const db = drizzle(connection, { logger: true, schema });
