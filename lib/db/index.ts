import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/lib/db/schema";

const connectionString = process.env.DATABASE_URL;

export const db =
  connectionString && connectionString.length > 0
    ? drizzle(neon(connectionString), { schema })
    : null;
