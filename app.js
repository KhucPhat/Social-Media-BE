const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const route = require("./routes");

const app = express();

const PORT = process.env.PORT | 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
route(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connect success"))
  .catch((err) => console.log(`Lỗi connection failed: ${err}`));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
