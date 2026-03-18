const { obtenerPosts } = require("../servicios/posts.service");
const { crearPost } = require("../servicios/posts.service");
const { obtenerPostsConAutor } = require("../servicios/posts.service");

const getPosts = async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo posts" });
  }
};

const postPost = async (req, res) => {
  try {
    const { author_id, title, content, published } = req.body;

    if (!author_id) {
      return res.status(400).json({ error: "author_id es obligatorio" });
    }

    if (!title || !content) {
      return res.status(400).json({ error: "title y content son obligatorios" });
    }

    const nuevoPost = await crearPost({
      author_id,
      title,
      content,
      published
    });

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando post" });
  }
};

const getPostsPorAutor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const posts = await obtenerPostsConAutor(authorId);

    if (posts.length === 0) {
      return res.status(404).json({ error: "No hay posts para este autor" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo posts del autor" });
  }
};

module.exports = {
  getPosts,
  postPost,
  getPostsPorAutor
};