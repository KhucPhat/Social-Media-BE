const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  MONGO_URL: process.env.MONGO_URI,
  PORT: parseInt(process.env.PORT) | 8080,
};
