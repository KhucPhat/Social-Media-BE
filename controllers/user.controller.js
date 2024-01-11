const bcrypt = require("bcrypt");
const { userService } = require("../services/services");
const { hashData } = require("../utils/password.util");
const apiResponse = require("../utils/apiResponse");

const getUser = async (req, res) => {
  const users = userService.find();
  res.send(users);
};

const registerUser = async (req, res) => {
  const data = req.body;
  const { fullname, username, email, password } = data;
  const encryptPass = hashData(password);

  const newUser = {
    fullname: fullname,
    username: username,
    email: email,
    password: encryptPass,
  };
  try {
    const emailDuplicate = await userService.findOne({ email: email });
    if (emailDuplicate)
      return apiResponse.notFoundResponse(res, "Email đã được đăng ký!");

    const user = await userService.create(newUser);

    return apiResponse.successResponse(res, "Đăng ký thành công");
  } catch (err) {
    return apiResponse.errorResponse(res, `Đã có lỗi xảy ra: ${err}`);
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
  loginUsers,
};
