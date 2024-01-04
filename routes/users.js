const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUsers,
  checkEmailDulicate,
  checkUsernameDulicate,
  checkFullnameDulicate,
} = require("../controllers/UserController");

router.post("/login", loginUsers);
router.post("/register", registerUser);
router.post("/check-email", checkEmailDulicate);
router.post("/check-name", checkUsernameDulicate);
router.post("/check-fullname", checkFullnameDulicate);

module.exports = router;
