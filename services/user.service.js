const { Users } = require("../models/models");

exports.create = async (data) => Users.create(data);
exports.find = async (data) => Users.find(data);
