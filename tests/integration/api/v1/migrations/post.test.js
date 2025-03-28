import database from "infra/database";

async function cleanDatabase() {
  await database.query(
    "DROP SCHEMA IF EXISTS public cascade; CREATE SCHEMA public;",
  );
}

beforeAll(cleanDatabase);

test("POST para /api/v1/migrations", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "post",
  });
  expect(response1.status).toBe(200);

  // response1Body
  const response1Body = await response1.json();
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "post",
  });
  expect(response2.status).toBe(200);

  // response2Body
  const response2Body = await response2.json();
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);

  const migrationsCount = await database.query(
    "SELECT COUNT(*) FROM pgmigrations",
  );
  expect(response1Body.length).toBe(
    Number.parseInt(migrationsCount.rows[0].count),
  );

  const migrationsNames = await database.query(
    "SELECT name FROM pgmigrations ORDER BY id DESC",
  );
  const response1Names = response1Body.map((migration) => migration.name);
  migrationsNames.rows.map((row) => {
    expect(response1Names).toContain(row.name);
  });

  // console.log(response1Body);
});
