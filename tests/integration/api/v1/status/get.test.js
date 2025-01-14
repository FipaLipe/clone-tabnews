test("GET para /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // responseBody
  const responseBody = await response.json();
  // console.log(responseBody);

  // updated_at
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  //dependencies
  const dependencies = responseBody.dependencies;
  expect(dependencies).toBeDefined();

  //database
  database = dependencies.database;
  expect(database).toBeDefined();

  expect(database.version).toBeDefined();
  expect(database.max_connections).toBeDefined();
  expect(database.opened_connections).toBeDefined();

  expect(database.version).toMatch("16.0");
  expect(database.max_connections).toEqual(100);
  expect(database.opened_connections).toEqual(1);
});
