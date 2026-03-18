const pool = require("../db");

const obtenerAutores = async () => {
  const result = await pool.query("SELECT * FROM authors ORDER BY id");
  return result.rows;
};

module.exports = {
  obtenerAutores
};