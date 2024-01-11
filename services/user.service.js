const { Users } = require("../models/models");

exports.create = async (data) => Users.create(data);
exports.findOne = async (data) => Users.findOne(data);
