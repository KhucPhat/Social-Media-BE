const express = require("express");
const { userController } = require("../controllers/controllers");
const { validationUser } = require("../validations/validations");
const router = express.Router();

router.post("/login", validationUser.login, userController.loginUsers);
router.get("/auth/verify", userController.verifyRegister);
router.post("/register", validationUser.register, userController.registerUser);

module.exports = router;
