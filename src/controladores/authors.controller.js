const {
  obtenerAutores,
  crearAutor,
  obtenerAutorPorId,
  actualizarAutor,
  eliminarAutor
} = require("../servicios/authors.service");

// GET /authors
const getAutores = async (req, res) => {
  try {
    const autores = await obtenerAutores();
    res.json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

// POST /authors
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

// GET /authors/:id
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

// PUT /authors/:id
const putAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "El email es obligatorio" });
    }

    const autorActualizado = await actualizarAutor(id, { name, email, bio });

    if (!autorActualizado) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(autorActualizado);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(400).json({ error: "El email ya existe" });
    }

    res.status(500).json({ error: "Error actualizando autor" });
  }
};

// DELETE /authors/:id
const deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;

    const autorEliminado = await eliminarAutor(id);

    if (!autorEliminado) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando autor" });
  }
};

module.exports = {
  getAutores,
  postAutor,
  getAutorPorId,
  putAutor,
  deleteAutor
};