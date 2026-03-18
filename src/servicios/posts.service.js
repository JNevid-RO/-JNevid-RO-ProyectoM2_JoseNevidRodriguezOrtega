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

module.exports = {
  obtenerPosts, 
  crearPost,
  obtenerPostsConAutor
};