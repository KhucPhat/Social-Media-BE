const express = require("express");
const { userController } = require("../controllers/controllers");
const router = express.Router();

router.post("/login", userController.loginUsers);
router.post("/register", userController.registerUser);
router.post("/check-email", userController.checkEmailDulicate);
router.post("/check-name", userController.checkUsernameDulicate);
router.post("/check-fullname", userController.checkFullnameDulicate);

module.exports = router;
