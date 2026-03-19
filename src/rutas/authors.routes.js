const express = require("express");
const router = express.Router();

const {
  getAutores,
  postAutor,
  getAutorPorId,
  putAutor,
  deleteAutor
} = require("../controladores/authors.controller");

router.get("/", getAutores);
router.get("/:id", getAutorPorId);
router.post("/", postAutor);
router.put("/:id", putAutor);     // 👈 CLAVE
router.delete("/:id", deleteAutor);

module.exports = router;