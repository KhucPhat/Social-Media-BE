const express = require("express");
const { auth } = require("../middlewares/auth");
const { messagesController } = require("../controllers/controllers");
const router = express.Router();

router.get("/:id", auth, messagesController)