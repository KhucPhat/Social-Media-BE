const bcrypt = require("bcryptjs");

exports.hashData = (value) => {
  const hashed = bcrypt.hashSync(value, 10);
  return hashed;
};

exports.compareData = (reqPassword, userPassword) => {
  return bcrypt.compare(reqPassword, userPassword);
};
