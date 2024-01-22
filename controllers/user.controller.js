const bcrypt = require("bcrypt");
const { userService } = require("../services/services");
const { hashData, compareData } = require("../utils/password.util");
const apiResponse = require("../utils/apiResponse");
const {
  generateAccessToken,
  verifyToken,
  generateVerifyToken,
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

    await userService.create(newUser);

    const cookieToken = generateVerifyToken(newUser);

    // thiết lập cookie phản hồi đến trình duyệt
    res.cookie("temp_data", cookieToken, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
    });

    const toEmail = `${config.APP_URL}/user/auth/verify`;

    sendEmailUser(email, "Xác thực đăng ký", "../views/sendEmail", {
      name: fullname,
      verificationLink: toEmail,
    });

    return apiResponse.successResponse(
      res,
      "Đăng ký thành công.Vui lòng xác thực tài khoản bằng email"
    );
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
      { email: userData.data.email },
      { verified: true }
    );

    return apiResponse.successResponse(res, "Xác thực thành công.");
  } catch (error) {
    return apiResponse.errorResponse(res, err.message);
  }
};

const loginUser = async (req, res) => {
  const data = { ...req.body };
  try {
    const user = await userService.findOne({ email: data.email });
    if (!user) return apiResponse.notFoundResponse(res, "Email không tồn tại!");

    const passwordIsValid = await compareData(data.password, user.password);
    if (!passwordIsValid) {
      return apiResponse.errorResponse(res, "Mật khẩu không đúng");
    }

    // create toke user
    const accessToken = generateAccessToken(user.id);
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
      info: profile,
    });
  } catch (error) {
    console.log(error);
    return apiResponse.errorResponse(res, error);
  }
};

const forgetPass = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userService.findOne({ email: email });
    if (!user)
      return apiResponse.notFoundResponse(
        res,
        "Email chưa được đăng ký tài khoản"
      );

    const otp = Math.floor(100000 + Math.random() * 90000).toString();

    res.cookie("otp", otp, { maxAge: 60000, httpOnly: true });
    res.cookie("email", email, {
      httpOnly: true,
    });

    sendEmailUser(email, "Quên mật khẩu", "../views/sendOtp", {
      otp: otp,
    });

    return apiResponse.successResponse(res, "success");
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

const confirmOTP = async (req, res) => {
  const otpEmail = req.cookies.otp;
  const dataOtp = req.body.otp;
  try {
    if (dataOtp !== otpEmail)
      return apiResponse.notFoundResponse(
        res,
        "Mã OTP không hợp lệ.Vui lòng thử lại"
      );
    return apiResponse.successResponse(res, "success");
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

const newPassword = async (req, res) => {
  const email = req.cookies.email;
  const newPassword = req.body.new_password;
  try {
    if (!email) return apiResponse.notFoundResponse(res, "Email không tồn tại");

    await userService.findOneAndUpdate(
      {
        email: email,
      },
      { password: hashData(newPassword) }
    );
    res.clearCookie("email");

    return apiResponse.successResponse(res, "Thay đổi mật khẩu thành công");
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

const changePassword = async (req, res) => {
  const data = { ...req.body };
  try {
    const user = await userService.findOne({ email: data.email });

    const passwordIsValid = await compareData(data.password, user.password);
    if (!passwordIsValid)
      return apiResponse.errorResponse(res, "Mật khẩu không đúng");

    await userService.findOneAndUpdate(
      { email: user.email },
      { password: hashData(data.new_password) }
    );

    return apiResponse.successResponse(res, "Thay đổi mật khẩu thành công");
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};

module.exports = {
  getUser,
  registerUser,
  verifyRegister,
  loginUser,
  forgetPass,
  confirmOTP,
  newPassword,
  changePassword,
};
