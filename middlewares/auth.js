const config = require("../config/config");
const { userService } = require("../services/services");
const { sendEmailUser } = require("../utils/mailer.util");
const { generateVerifyToken, verifyToken } = require("../utils/token.util");
const apiResponse = require("../utils/apiResponse");

exports.authVerifyAccount = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await userService.findOne({ email: data.email });
    if (user && !user.verified) {
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

      return apiResponse.errorResponse(
        res,
        "Tài khoản chưa được xác thực.Vui lòng kiểm tra email xác thực tài khoản."
      );
    }

    next();
  } catch (err) {
    return apiResponse.errorResponse(res, err.message);
  }
};

exports.auth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return apiResponse.notFoundResponse(res, "Authorization");
  }
  try {
    const token = await authorization.split(" ")[1];

    const { id } = verifyToken(token, config.ACCESS_TOKEN_SECRET);
    if (!id) return apiResponse.notFoundResponse(res, "Invalid token");

    const user = await userService.findOneById(id);

    if (!user && user.verified === false)
      return apiResponse.notFoundResponse(res, "Invalid user");
    req.user = user;
    req.id = id;

    next();
  } catch (error) {
    return apiResponse.errorResponse(res, error.message);
  }
};
