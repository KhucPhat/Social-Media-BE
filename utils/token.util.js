const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.generateAccessToken = (id) => {
  try {
    return jwt.sign(
      {
        id: id,
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "1w" },
      { algorithm: "RS256" }
    );
  } catch (err) {
    console.error("Error generating token:", err);
  }
};

exports.generateVerifyToken = (email) => {
  try {
    return jwt.sign(
      {
        data: email,
      },
      config.VERIFY_TOKEN_SECRET,
      { expiresIn: "5m" },
      { algorithm: "RS256" }
    );
  } catch (error) {
    console.error("Error generating token:", err);
  }
};

exports.verifyToken = (token, secret) => {
  try {
    const decode = jwt.verify(token, secret);
    return decode;
  } catch (error) {
    console.error("Xác thực thất bại: ", error);
  }
};
