const authorsRoutes = require("./rutas/authors.routes");
const pool = require("./db");
require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use("/authors", authorsRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ mensaje: "API MiniBlog funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR REAL:", error.message);
    res.status(500).json({ error: error.message });
  }
});