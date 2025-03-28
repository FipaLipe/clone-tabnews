import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response.status(405);
  }

  const dbClient = database.newClient();
  await dbClient.connect();

  const migrations = await migrationRunner({
    dbClient,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun: request.method === "GET",
    verbose: true,
  });

  await dbClient.end();

  return response.status(200).json(migrations);
}
