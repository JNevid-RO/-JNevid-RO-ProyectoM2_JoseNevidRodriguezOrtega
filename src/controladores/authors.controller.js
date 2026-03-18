const { obtenerAutores } = require("../servicios/authors.service");

const getAutores = async (req, res) => {
  try {
    const autores = await obtenerAutores();
    res.json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

module.exports = {
  getAutores
};