import database from "infra/database.js";

async function status(request, response) {
  console.log((await database.query("SELECT 1 + 1 AS sum;")).rows);
  response.status(200).json({ valor: "Deu certo água" });
}

export default status;
