const { Users } = require("../models/models");

exports.create = async (data) => Users.create(data);
exports.findOne = async (data) => Users.findOne(data);
exports.findSelect = async (data, field) => Users.find(data).select(field);
exports.findOneAndUpdate = async (data, update) =>
  Users.findOneAndUpdate(data, update, { new: true });
