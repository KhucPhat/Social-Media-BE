const express = require("express");
const router = express.Router();
const { registerUser, loginUsers } = require("../controllers/UserController");

router.post("/login", loginUsers);
router.post("/register", registerUser);

module.exports = router;
