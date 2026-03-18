const pool = require("../db");

const obtenerAutores = async () => {
  const result = await pool.query("SELECT * FROM authors ORDER BY id");
  return result.rows;
};

const crearAutor = async ({ name, email, bio }) => {
  const query = `
    INSERT INTO authors (name, email, bio)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [name, email, bio];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerAutorPorId = async (id) => {
  const result = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  obtenerAutores,crearAutor,obtenerAutorPorId
};