const config = require("../config/config");
const { userService } = require("../services/services");
const { sendEmailUser } = require("../utils/mailer.util");
const { generateVerifyToken } = require("../utils/token.util");
const apiResponse = require("../utils/apiResponse");

exports.authVerifyAccount = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await userService.findOne({ email: data.email });
    if (!user.verified) {
      const userInfo = {
        fullname: data.fullname,
        username: data.username,
        email: user.email,
        password: user.password,
      };

      const cookieToken = generateVerifyToken(userInfo);
      res.cookie("temp_data", cookieToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
      });

      const toEmail = `${config.APP_URL}/api/v1/user/auth/verify`;

      sendEmailUser(user.email, "Xác thực tài khoản", "../views/sendEmail", {
        user: user.fullname,
        verificationLink: toEmail,
      });

      return apiResponse.successResponse(
        res,
        "Tài khoản chưa được xác thực.Vui lòng kiểm tra email xác thực tài khoản."
      );
    }

    next();
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};
