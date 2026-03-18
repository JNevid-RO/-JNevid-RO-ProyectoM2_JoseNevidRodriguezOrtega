const { crearAutor } = require("../servicios/authors.service");
const { obtenerAutores } = require("../servicios/authors.service");
const { obtenerAutorPorId } = require("../servicios/authors.service");

const getAutores = async (req, res) => {
  try {
    const autores = await obtenerAutores();
    res.json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

const postAutor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "El email es obligatorio" });
    }

    const nuevoAutor = await crearAutor({ name, email, bio });

    res.status(201).json(nuevoAutor);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ error: "El email ya existe" });
    }

    res.status(500).json({ error: "Error creando autor" });
  }
};

const getAutorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const autor = await obtenerAutorPorId(id);

    if (!autor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(autor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo autor" });
  }
};

module.exports = {
  getAutores,
  postAutor,
  getAutorPorId
};