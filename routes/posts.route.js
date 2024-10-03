const express = require("express");
const { auth } = require("../middlewares/auth");
const { postsController } = require("../controllers/controllers");
const router = express.Router();

router.get("/posts", auth, postsController.getListDataPosts);
