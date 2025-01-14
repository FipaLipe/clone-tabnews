import database from "infra/database.js";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;

  const version = (await database.query("SHOW server_version")).rows[0]
    .server_version;
  const maxConnections = parseInt(
    (await database.query("SHOW max_connections")).rows[0].max_connections,
  );
  const openedConnections = (
    await database.query({
      text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1",
      values: [databaseName],
    })
  ).rows[0].count;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
