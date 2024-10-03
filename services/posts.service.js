const { Posts } = require("../models/models");

exports.getListPost = async () => {
  return Posts.find();
};
