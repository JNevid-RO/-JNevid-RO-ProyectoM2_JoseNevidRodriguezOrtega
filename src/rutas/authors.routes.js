const express = require("express");
const router = express.Router();

const { getAutores, postAutor } = require("../controladores/authors.controller");

router.get("/", getAutores);
router.post("/", postAutor);
module.exports = router;