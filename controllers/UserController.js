const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const users = UserModel.find();
  res.send(users);
};

const checkEmailDulicate = async (req, res) => {
  try {
    const email = req.body.email;
    const existingEmail = await UserModel.find({
      email: email,
    });
  } catch (error) {}
};

const checkFullnameDulicate = async (req, res) => {
  try {
    const fullname = req.body.fullname;
    const existingFullName = await UserModel.find({
      fullname: fullname,
    });
  } catch (error) {}
};

const checkUsernameDulicate = async (req, res) => {
  try {
    const username = req.body.username;
    const existingFullName = await UserModel.find({
      fullname: fullname,
    });
  } catch (error) {}
};

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const { fullname, username, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({
      fullname: fullname,
      username: username,
      email: email,
      password: hashed,
    });
    console.log("newUser", newUser);

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Đã có lỗi xảy ra: ${err}`);
  }
};

const loginUsers = async (req, res) => {
  try {
    const data = req.body;
    const { fullname, username, email, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({
      fullname: fullname,
      username: username,
      email: email,
      password: hashed,
    });
    console.log("newUser", newUser);

    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUsers,
};
