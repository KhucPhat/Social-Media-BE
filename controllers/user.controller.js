const bcrypt = require("bcrypt");
const { userService } = require("../services/services");
const { hashData, compareData } = require("../utils/password.util");
const apiResponse = require("../utils/apiResponse");
const {
  genareteAccessToken,
  genareteVerifyToken,
  verifyToken,
} = require("../utils/token.util");
const config = require("../config/config");
const { sendEmailUser } = require("../utils/mailer.util");

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

    const cookieToken = genareteVerifyToken(newUser);

    // thiết lập cookie phản hồi đến trình duyệt
    res.cookie("temp_data", cookieToken, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
    });

    const toEmail = `${config.APP_URL}/user/auth/verify`;

    sendEmailUser(toEmail, "Xác thực đăng ký", "../views/sendEmail.html", {
      name: fullname,
      verificationLink: toEmail,
    });

    return apiResponse.successResponse(res, "Đăng ký thành công");
  } catch (err) {
    return apiResponse.errorResponse(res, `Đã có lỗi xảy ra: ${err}`);
  }
};

const verifyRegister = async (req, res) => {
  const cookieToken = req.cookies.temp_data;
  const userData = verifyToken(cookieToken, config.VERIFY_TOKEN_SECRET);

  try {
    if (!userData) return apiResponse.notFoundResponse(res, "Forbidden");

    await userService.findOneAndUpdate(
      { email: userData.email },
      { verified: true }
    );

    return apiResponse.successResponse(res, "Xác thực thành công.");
  } catch (error) {
    console.error(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};

const loginUsers = async (req, res) => {
  const data = { ...req.body };
  try {
    const user = await userService.findOne({ email: data.email });
    if (!user) return apiResponse.notFoundResponse(res, "Email không tồn tại!");

    const passwordIsValid = await compareData(data.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send("Mật khẩu không đúng");
    }

    // create toke user
    const accessToken = genareteAccessToken(user.id);
    if (!accessToken)
      return apiResponse.notFoundResponse(
        res,
        "Đăng nhập không thành công, vui lòng thử lại."
      );

    const profile = await userService.findSelect(
      { _id: user._id },
      "-password"
    );

    return apiResponse.successResponseWithData(res, "Đăng nhập thành công", {
      accessToken: accessToken,
      profile: profile,
    });
  } catch (error) {
    console.log(error);
    return apiResponse.errorResponse(res, error);
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUsers,
  verifyRegister,
};
