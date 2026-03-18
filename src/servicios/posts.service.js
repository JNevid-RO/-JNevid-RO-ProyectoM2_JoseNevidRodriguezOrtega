const pool = require("../db");

const obtenerPosts = async () => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id");
  return result.rows;
};

const crearPost = async ({ author_id, title, content, published }) => {
  const query = `
    INSERT INTO posts (author_id, title, content, published)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [author_id, title, content, published];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerPostsConAutor = async (authorId) => {
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.published,
      posts.created_at,
      authors.id AS author_id,
      authors.name,
      authors.email
    FROM posts
    JOIN authors ON posts.author_id = authors.id
    WHERE authors.id = $1
    ORDER BY posts.id;
  `;

  const result = await pool.query(query, [authorId]);
  return result.rows;
};

const obtenerPostPorId = async (id) => {
  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

const actualizarPost = async (id, { title, content, published }) => {
  const query = `
    UPDATE posts
    SET title = $1,
        content = $2,
        published = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [title, content, published, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminarPost = async (id) => {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  obtenerPosts, 
  crearPost,
  obtenerPostsConAutor,
  obtenerPostPorId, 
  actualizarPost,
  eliminarPost
};
