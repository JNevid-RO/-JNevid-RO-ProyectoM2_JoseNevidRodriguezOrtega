const express = require("express");
const router = express.Router();
const { getAutores } = require("../controladores/authors.controller");

router.get("/", getAutores);

module.exports = router;