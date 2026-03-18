const { crearAutor } = require("../servicios/authors.service");
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

module.exports = {
  getAutores,
  postAutor
};