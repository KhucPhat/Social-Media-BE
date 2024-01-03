const UserModel = require("../models/UserModel");

const getUser = async (req, res) => {
  const users = UserModel.find();
  res.send(users);
};

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);
    return res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Đã có lỗi xảy ra.");
  }
};

module.exports = {
  getUser,
  registerUser,
};
