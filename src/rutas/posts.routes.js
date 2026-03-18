const express = require("express");
const router = express.Router();

const { getPosts, postPost, getPostsPorAutor, getPostPorId, putPost, deletePost } = require("../controladores/posts.controller");

router.get("/", getPosts);
router.get("/author/:authorId", getPostsPorAutor);
router.get("/:id", getPostPorId);
router.post("/", postPost);
router.put("/:id", putPost);
router.delete("/:id", deletePost);

module.exports = router;