import database from "infra/database";

async function cleanDatabase() {
  await database.query(
    "DROP SCHEMA IF EXISTS public cascade; CREATE SCHEMA public;",
  );
}

beforeAll(cleanDatabase);

test("GET para /api/v1/migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  // responseBody
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
