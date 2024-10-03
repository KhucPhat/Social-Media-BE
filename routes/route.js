const express = require("express");
const router = express.Router();
const userRoute = require("./users.route");
const messageRoute = require("./messages.route");

router.use("/user", userRoute);
router.use("/message", messageRoute);

module.exports = router;
