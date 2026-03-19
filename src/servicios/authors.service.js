const pool = require("../db");

// Obtener todos
const obtenerAutores = async () => {
  const result = await pool.query("SELECT * FROM authors ORDER BY id");
  return result.rows;
};

// Crear
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

// Obtener por ID
const obtenerAutorPorId = async (id) => {
  const result = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Actualizar
const actualizarAutor = async (id, { name, email, bio }) => {
  const query = `
    UPDATE authors
    SET name = $1,
        email = $2,
        bio = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [name, email, bio, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Eliminar
const eliminarAutor = async (id) => {
  const result = await pool.query(
    "DELETE FROM authors WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  obtenerAutores,
  crearAutor,
  obtenerAutorPorId,
  actualizarAutor,
  eliminarAutor
};