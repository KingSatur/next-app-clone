import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("There is no database url");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    await migrate(db, { migrationsFolder: "migrations" });
  } catch (error) {
    console.log(error);

    console.log("Error on db migration");
  }
};
migrateDb();
export default db;
