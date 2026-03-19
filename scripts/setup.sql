CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_author
    FOREIGN KEY (author_id)
    REFERENCES authors(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_posts_author_id
ON posts(author_id);

INSERT INTO authors (name, email, bio)
VALUES
('Juan Pérez', 'juan@test.com', 'Backend dev'),
('Ana López', 'ana@test.com', 'Frontend dev')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (author_id, title, content, published)
VALUES
(1, 'Primer post', 'Contenido de prueba', true),
(1, 'Segundo post', 'Más contenido', false),
(2, 'Post de Ana', 'Contenido de Ana', true);