require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const pool = require("./db");

const initDB = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, "../scripts/setup.sql"), "utf8");
    await pool.query(sql);
    console.log("✅ Database initialized");
  } catch (error) {
    console.error("DB init error:", error.message);
  }
};

const authorsRoutes = require("./rutas/authors.routes");
const postsRoutes = require("./rutas/posts.routes");

const app = express();

app.use(express.json());
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./docs/openapi.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/authors", authorsRoutes);
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "API MiniBlog funcionando" });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR REAL:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  });
}

module.exports = app;