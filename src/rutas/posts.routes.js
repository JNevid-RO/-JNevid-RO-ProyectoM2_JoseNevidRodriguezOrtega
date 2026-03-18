const express = require("express");
const router = express.Router();

const { getPosts, postPost, getPostsPorAutor } = require("../controladores/posts.controller");

router.get("/", getPosts);
router.get("/author/:authorId", getPostsPorAutor);
router.post("/", postPost);

module.exports = router;