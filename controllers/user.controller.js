const bcrypt = require("bcrypt");
const { userService } = require("../services/services");
const { hashData } = require("../utils/password.util");

const getUser = async (req, res) => {
  const users = userService.find();
  res.send(users);
};

const checkEmailDulicate = async (req, res) => {
  try {
    const email = req.body.email;
    const existingEmail = await userService.find({
      email: email,
    });
    if (existingEmail.length) {
      res.status(422).json({ message: "Email đã tồn tại.Vui lòng thử lại!" });
    } else {
      res.status(200).json({ success: true, message: "success", error: false });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkFullnameDulicate = async (req, res) => {
  try {
    const fullname = req.body.fullname;
    const existingFullName = await userService.find({
      fullname: fullname,
    });
    if (existingFullName.length) {
      res.status(422).json({ message: "Tên đã tồn tại.Vui lòng thử lại!" });
    } else {
      res.status(200).json({ success: true, message: "success", error: false });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkUsernameDulicate = async (req, res) => {
  try {
    const username = req.body.username;
    const existingUsername = await userService.find({
      username: username,
    });
    if (existingUsername.length) {
      res.status(422).json({ message: "Tên đã tồn tại.Vui lòng thử lại!" });
    } else {
      res.status(200).json({ success: true, message: "success", error: false });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const { fullname, username, email, password } = data;
    const encryptPass = hashData(password);

    const newUser = {
      fullname: fullname,
      username: username,
      email: email,
      password: encryptPass,
    };

    const user = await userService.create(newUser);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Đã có lỗi xảy ra: ${err}`);
  }
};

const loginUsers = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUser,
  registerUser,
  checkEmailDulicate,
  checkUsernameDulicate,
  checkFullnameDulicate,
  loginUsers,
};
