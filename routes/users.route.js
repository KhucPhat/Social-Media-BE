const express = require("express");
const { userController } = require("../controllers/controllers");
const { validationUser } = require("../validations/validations");
const { authVerifyAccount, auth } = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/change-password",
  validationUser.changePass,
  userController.changePassword
);
router.post(
  "/new-password",
  validationUser.dataPass,
  userController.newPassword
);
router.post("/confirm-otp", userController.confirmOTP);
router.post(
  "/forget-pass",
  validationUser.dataEmail,
  userController.forgetPass
);
router.post(
  "/login",
  validationUser.login,
  authVerifyAccount,
  userController.loginUser
);
router.get("/auth/verify", userController.verifyRegister);
router.post("/register", validationUser.register, userController.registerUser);
router.get("/me", auth, userController.getInfoUser);

module.exports = router;
