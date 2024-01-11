const express = require("express");
const { userController } = require("../controllers/controllers");
const { validationUser } = require("../validations/validations");
const router = express.Router();

router.post("/login", userController.loginUsers);
router.post("/register", validationUser.register, userController.registerUser);

module.exports = router;
