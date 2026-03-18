const express = require("express");
const router = express.Router();

const { getAutores, postAutor, getAutorPorId } = require("../controladores/authors.controller");

router.get("/", getAutores);
router.get("/:id", getAutorPorId);
router.post("/", postAutor);
module.exports = router;