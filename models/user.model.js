const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      require: [true, "Vui lòng điền đầy đủ tên!"],
    },
    username: {
      type: String,
      require: [true, "Vui lòng điền đầy đủ tên!"],
    },
    email: {
      type: String,
      require: [true, "Vui lòng nhập email!"],
    },
    password: {
      type: String,
      require: [true, "Vui lòng nhập mật khẩu của bạn"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
